import { Request, Response, NextFunction } from "express"
import { EmpleadoRepository } from "./empleado.repository.js"
import { Empleado } from "./empleado.entity.js"

const repository = new EmpleadoRepository
function sanitizeEmpleadoInput(req: Request, res: Response, next: NextFunction){
    
    req.body.sanitizedInput = {
        nombre: req.body.name,
        apellido: req.body.apellido,
        profesion: req.body.profesion,
    }

    Object.keys(req.body.sanitizedInput).forEach(key=>{
        if(req.body.sanitizedInput[key]===undefined) delete req.body.sanitizedInput[key]
    })

    next()
}

function findAll( req:Request,res:Response){
    res.json({data:repository.findAll()})
}
export{sanitizeEmpleadoInput, findAll}