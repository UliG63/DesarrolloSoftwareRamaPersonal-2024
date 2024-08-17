import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Institucion } from "./institucion.entity.js";

//Defino el entity manager "em"
const em = orm.em

async function findAll(req: Request, res:Response){
    try{
        const instituciones= await em.find(Institucion, {})
        res.status(200).json({message:'find all instituciones',data:instituciones})
    }catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const institucion= await em.findOneOrFail(Institucion, {id})
        res
            .status(200).
            json({message: 'found institucion', data:institucion})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res:Response){ 
    try{
        const institucion = em.create(Institucion, req.body)
        await em.flush()
        res.status(201).json({message:'Institucion created', data:institucion})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response){
    try{
        const id= Number.parseInt(req.params.id)
        const institucion = em.getReference(Institucion, id)
        em.assign(institucion, req.body)
        await em.flush()
        res.status(200).json({ message: 'Institucion updated'})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const institucion = em.getReference(Institucion, id)
        await em.removeAndFlush(institucion)
        res.status(200).send({ message: 'Institucion removed'})
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

export {findAll, findOne, add, update, remove}