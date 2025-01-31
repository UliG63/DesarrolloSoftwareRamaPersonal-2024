import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Solicitud } from "./solicitud.entity.js";
import { SolicitudEstado } from "./solicitud.enum.js";
import { Magos } from "../magos/magos.entity.js";
import { Hechizo } from "../hechizo/hechizo.entity.js";

const em= orm.em;
function sanitizeSolicitudInput(req: Request, res: Response, next: NextFunction)
{
    req.body.sanitizedInput = {
        fecha_hasta: req.body.fecha_hasta,
        permanente: req.body.permanente,     
        motivo:req.body.motivo,
        motivo_rechazo:req.body.motivo_rechazo,
        estado:req.body.estado,
        hechizo:req.body.hechizo,
        mago:req.body.mago,
        empleado:req.body.empleado,
        idMago:req.body.idMago,
        idHechizo:req.body.idHechizo     
    }

    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}
//Buscar todas las solicitudes
async function findAll(req: Request, res:Response){
    try{
        const solicitudes = await em.find(Solicitud, {}, {populate:['fecha_hasta' ,'permanente', 'motivo', 'motivo_rechazo', 'estado', 'hechizo', 'mago', 'empleado'
                                                                ]});
        res.status(200).json({ message: "Found All Solicitudes", data: solicitudes });
    } catch (error: any){
        res.status(500).json({ message: error.message });
    }
    
}

//Buscar solicitudes pendientes de revision
async function findAllPending(req:Request, res:Response) {
    try {
        const solicitudesPendientes = await em.find(Solicitud, {estado: SolicitudEstado.PENDIENTE_REVISION},{populate:['fecha_hasta' ,'permanente', 'motivo', 'motivo_rechazo', 'estado', 'hechizo', 'mago', 'empleado']});
        res.status(200).json({ message: "Solicitudes pendientes de revisión encontradas", data: solicitudesPendientes });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

//Creacion de nueva solicitud
async function add(req: Request, res:Response){
    try{
            // Obtener los datos del cuerpo de la request
                    const { idMago,idHechizo, ...solicitudData } = req.body.sanitizedInput;
                    
                    // Verificar si el mago existe
                    let magoExistente = await em.findOne(Magos, { id: idMago });
                    if (!magoExistente) {
                        return res.status(404).json({ message: 'Mago no encontrado' });
                    }
                    /*
                        Verificar si el hechizo existe (podria omitirse en caso de que la request
                        ya disponga del objeto hechizo ) 
                    */
                    let hechizoExistente = await em.findOne(Hechizo, {id: idHechizo} )
                    if (!hechizoExistente) {
                        return res.status(404).json({ message: 'Hechizo no encontrado' });
                    }
                    // Crear la solicitud vinculada al mago existente
                    const nuevaSolicitud = em.create(Solicitud, {
                        ...solicitudData,
                        mago: magoExistente, // Asociar el mago con la solicitud
                        hechizo: hechizoExistente, //Asociar el hechizo con la solicitud
                        estado: SolicitudEstado.PENDIENTE_REVISION, //Asignacion por defecto
                        permanente: false, //Asignacion por defecto.
                    });
            //Guardado en base de datos
            await em.flush()
            res.status(201).json({ message: 'Solicitud creada', data:nuevaSolicitud})
        }
        catch(error: any){
            res.status(500).json({message:error.message})
        }
}

//Deberiamos utilizar el sanitizeInput, por el momento lo hacemos sin el.
async function grant(req:Request, res:Response){
    try {
        // Buscar la solicitud por su ID
        const id = Number.parseInt(req.params.id)
        const solicitud = await em.findOneOrFail(Solicitud,{ id });
        //Obtengo el empleado actual para asignar a la solicitud
        const empleado = await em.findOneOrFail(Magos,{id:req.body.empleado.id});

        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        // Verificar que el estado actual sea "pendiente_revision"
        if (solicitud.estado !== SolicitudEstado.PENDIENTE_REVISION) {
            return res.status(400).json({ message: 'La patente no está pendiente de revisión' });
        }
        // Actualizar el estado, asignar empleado, y definir si la solicitud es permanente o no.
        solicitud.estado = SolicitudEstado.APROBADA;
        solicitud.empleado = empleado;
        // Si se ha seleccionado como permanente, no se asigna fecha de validez, sino, asigna la fecha de validez
        if(req.body.permanente){
            solicitud.permanente = req.body.permanente;
        }else{
            solicitud.permanente = false;
            solicitud.fecha_hasta = req.body.fecha_hasta;
        }
       
        await em.persistAndFlush([solicitud]);


        res.status(200).json({ message: 'Solicitud aprobada correctamente', data: solicitud });
    } catch (error: any) {
        res.status(500).json({ message: 'Hubo un problema al aprobar la solicitud' });
    }
}

//Rechazar la solicitud
async function reject(req: Request, res: Response) {
    try {
        // Busca la solicitud por su ID
        const id = Number.parseInt(req.params.id);
        const solicitud= await em.findOneOrFail(Solicitud, { id }, { populate: ['fecha_hasta' ,'permanente', 'motivo', 'motivo_rechazo', 'estado', 'hechizo', 'mago', 'empleado'] });

        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        // Verifica que el estado actual sea "pendiente_revision"
        if (solicitud.estado !== SolicitudEstado.PENDIENTE_REVISION) {
            return res.status(400).json({ message: 'La solicitud no está pendiente de revisión' });
        }

        // Actualiza el estado de la solicitud a "rechazada", agrega el motivo y el empleado que la rechazó.
        solicitud.estado = SolicitudEstado.RECHAZADA;
        solicitud.motivo_rechazo = req.body.sanitizedInput.motivo_rechazo;
        solicitud.empleado = req.body.sanitizedInput.empleado;

        // Actualiza en BD
        await em.persistAndFlush([solicitud]);

        res.status(200).json({ message: 'Solicitud rechazada', data: solicitud });

    } catch (error: any) {
        console.error('Error rejecting solicitud:', error);
        res.status(500).json({ message: 'Hubo un problema rechazando la solicitud' });
    }
}

async function update(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function findByMago(req:Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const magoExistente = await em.findOneOrFail(Magos, {id})
        if (!magoExistente) {
            return res.status(404).json({ message: 'Mago no encontrado' });
        }
        const solicitudes = await em.find(Solicitud, {mago: magoExistente},{populate:['fecha_hasta' ,'permanente', 'motivo', 'motivo_rechazo', 'estado', 'hechizo', 'mago', 'empleado']});
        res.status(200).json({ message: "Solicitudes del mago encontradas", data: solicitudes });
    } catch (error:any) {
        res.status(500).json({ message: 'Hubo un problema' });
    }
}

export {findAll,findAllPending,findByMago, findOne, add, grant , update, remove, reject, sanitizeSolicitudInput}