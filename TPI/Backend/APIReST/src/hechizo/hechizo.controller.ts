import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Hechizo } from "./hechizo.entity.js";
import { Magos } from "../magos/magos.entity.js";
import { Solicitud } from "../solicitud_visualizacion/solicitud.entity.js";

const em = orm.em;

async function findAll(req: Request, res: Response) {
    try {
        const hechizos = await em.find(Hechizo, {}, {populate:['nombre' , 'descripcion', 'instrucciones','solicitudes', 'restringido', 'patente',
                                                                'patente.tipo_hechizo','patente.mago', 'patente.etiquetas']});
        //Protejo los datos sensibles
        const id = Number.parseInt(req.params.id)
        const magoExistente = await em.findOneOrFail(Magos, {id})
        if (!magoExistente) {
            return res.status(404).json({ message: 'Mago no encontrado' });
        }
        let hechizosFiltrados = hechizos;
        if (!magoExistente.isEmpleado) {
            hechizosFiltrados = hechizos.map(h => {
                if (h.restringido) {
                    const tieneSolicitudAprobada = h.solicitudes.getItems().some(s => s.mago.id === magoExistente.id && s.estado === 'aprobada');
                    const esCreadorDePatente = h.patente?.mago.id === magoExistente.id;
                    if (!tieneSolicitudAprobada && !esCreadorDePatente) {
                        return { ...h, instrucciones: "[Redacted]", patente:{...h.patente, instrucciones: "[Redacted]"} };
                    }
                }
                return h;
            });
        }
        console.log(hechizosFiltrados)
        res.status(200).json({ message: "Found All Hechizos", data: hechizosFiltrados });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const hechizo = await em.findOneOrFail(Hechizo,{id})
        res.status(200).json({ message: 'found hechizo', data: hechizo });
    }catch(error:any){
        res.status(500).json({ message: error.message });
    }
}
//Devuelve los hechizos restringidos para los cuales un mago puede solicitar acceso de visualizacion
async function getAvailableForVisualizacion(req:Request, res:Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const magoExistente = await em.findOneOrFail(Magos, {id})
        if (!magoExistente) {
            return res.status(404).json({ message: 'Mago no encontrado' });
        }
        const hechizos = await em.find(Hechizo, {
            restringido: true,
            $or: [
                {solicitudes:{$eq:null}},
                {solicitudes:{
                    mago: magoExistente,
                    estado: {$nin:['pendiente_revision','aprobada']}
                }}
            ]

        }, {populate:['patente']})
        res.status(200).json({ message: "Hechizos disponibles", data: hechizos });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}
//devuelve los IDs de los hachizos que el usuario puede visualizar
async function findPermitedForUser(req:Request, res:Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const magoExistente = await em.findOneOrFail(Magos, {id})
        if (!magoExistente) {
            return res.status(404).json({ message: 'Mago no encontrado' });
        }
        let hechizosPermitidos = null;
        //si es empleado, el usuario puede visualizar todos los hechizos
        if(magoExistente.isEmpleado){
             hechizosPermitidos = await em.find(Hechizo, {}, {fields: ['id']})
        }else{ //si no es empleado, el usuario puede ver los hechizos no restringidos, los de su propia autoria y aquellos para los cuales tenga solicitudes vigentes
            hechizosPermitidos = await em.find(Hechizo,{
                $or: [
                    {restringido: false},
                    {patente: {mago: magoExistente}},
                    {solicitudes:{mago: magoExistente, estado: 'aprobada'}}
                ]
            }, {fields: ['id']})
        }
        res.status(200).json({message: "Hechizos que el usuario puede visualizar", data: hechizosPermitidos})
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}


async function add(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function update(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

export {findAll, findOne, add, update, remove, getAvailableForVisualizacion, findPermitedForUser}