/*import { Request, Response, NextFunction } from "express"
import { MagosRepository } from "./magos.repository.js"
import { Magos } from "./magos.entity.js"
*/


/*
function findAll( req:Request,res:Response){
    res.json({data:repository.findAll()})
}

function findOne(req:Request,res:Response){
    const id= req.params.id
    const mago = repository.findOne({id})
    if(!mago){
        return res.status(404).send({message:'Mago not Found'})
    }
    res.json({data:mago})
}


function add(req:Request,res:Response){
    const input=req.body.sanitizedInput

    const magoInput=new Magos(
        input.name,
        input.apellido,
        input.varita
    )
    const mago= repository.add(magoInput)
    return res.status(201).send({message:'Mago Creado',data:mago})
}

function update(req:Request,res:Response){
    //Por laguna razon, el id del sanitizedInput no es id, sino idMago
    req.body.sanitizedInput.idMago =req.params.id
    const mago=repository.update(req.body.sanitizedInput)

    if(!mago){
        return res.status(404).send({message:'Mago not Found'}) 
    }
    return res.status(200).send({message:"Mago actualizado correctamente",data:mago})
}

function remove(req:Request,res:Response){
    const id=req.params.id
    const mago=repository.delete({id})
    
    if(!mago){
        return res.status(404).send({message:'Mago not Found'}) 
    }
    else{
        return res.status(200).send({message:'Mago eliminado exitosamente'})
    }
}



*/

import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Magos } from "./magos.entity.js";

const em = orm.em
function sanitizeMagoInput(req: Request, res: Response, next: NextFunction)
{
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,     
        email:req.body.email,
        pass:req.body.pass,
        madera_varita:req.body.madera_varita,
        nucleo_varita:req.body.nucleo_varita,
        largo_varita:req.body.largo_varita,
        isEmpleado:req.body.isEmpleado,
        institucion:req.body.institucion,
        patentes:req.body.patentes,
        solicitudes:req.body.solicitudes, 
    }

    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res:Response){
    try {
        const magos = await em.find(Magos, {},{populate:['institucion']} )
        res.status(200).json({ message: 'found all magos', data:magos})
    }
    catch(error: any){
        res.status(500).json({message:error.message})
    }

}

async function findOne(req: Request, res:Response){
    res.status(500).json({message:'Not implemented'})
}

async function add(req: Request, res:Response){
    try{
        const mago = em.create(Magos, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({ message: 'Mago created', data:mago})
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

export{sanitizeMagoInput, findAll, findOne, add, update, remove}