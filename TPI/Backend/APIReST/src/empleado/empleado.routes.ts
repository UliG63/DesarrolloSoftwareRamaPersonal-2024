/*import { Router } from "express";
import { sanitizeEmpleadoInput, findAll, findOne,add,update,remove } from "./empleado.controller.js";


export const empleadoRouter = Router()

empleadoRouter.get('/',findAll)
empleadoRouter.get('/:id',findOne)
empleadoRouter.post('/',sanitizeEmpleadoInput,add)
empleadoRouter.put('/:id',sanitizeEmpleadoInput,update)
empleadoRouter.patch('/:id',sanitizeEmpleadoInput,update)
empleadoRouter.delete('/:id',remove)*/

import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./empleado.controller.js";

export const empleadoRouter = Router()

empleadoRouter.get('/',findAll)
empleadoRouter.get('/:id', findOne)
empleadoRouter.post('/', add)
empleadoRouter.put('/:id', update)
empleadoRouter.delete('/:id', remove)