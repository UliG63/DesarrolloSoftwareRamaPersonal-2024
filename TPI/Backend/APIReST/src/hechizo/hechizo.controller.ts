import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Hechizo } from "./hechizo.entity.js";

const em = orm.em;

async function findAll(req: Request, res: Response) {
    try {
        const hechizos = await em.find(Hechizo, {}, {populate:['nombre' , 'descripcion', 'instrucciones', 'restringido', 'patente',
                                                                'patente.tipo_hechizo','patente.mago', 'patente.etiquetas']});
        console.log(hechizos)
        res.status(200).json({ message: "Found All Hechizos", data: hechizos });
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

async function add(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function update(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

export {findAll, findOne, add, update, remove}