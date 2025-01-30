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
        fecha: req.body.fecha,
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
        const solicitudes = await em.find(Solicitud, {}, {populate:['fecha' ,'permanente', 'motivo', 'motivo_rechazo', 'estado', 'hechizo', 'mago', 'empleado'
                                                                ]});
        res.status(200).json({ message: "Found All Solicitudes", data: solicitudes });
    } catch (error: any){
        res.status(500).json({ message: error.message });
    }
    
}

//Buscar solicitudes pendientes de revision
async function findAllPending(req:Request, res:Response) {
    try {
        const solicitudesPendientes = await em.find(Solicitud, {estado: SolicitudEstado.PENDIENTE_REVISION},{populate:['fecha' ,'permanente', 'motivo', 'motivo_rechazo', 'estado', 'hechizo', 'mago', 'empleado']});
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
                        fecha: new Date(),
                    });
            //Guardado en base de datos
            await em.flush()
            res.status(201).json({ message: 'Solicitud creada', data:nuevaSolicitud})
        }
        catch(error: any){
            res.status(500).json({message:error.message})
        }
}

async function update(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

export {findAll,findAllPending, findOne, add, update, remove, sanitizeSolicitudInput}