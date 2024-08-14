import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./patente.controller.js";

export const patenteRouter = Router()

patenteRouter.get('/',findAll)
patenteRouter.get('/:id', findOne)
patenteRouter.post('/', add)
patenteRouter.put('/:id', update)
patenteRouter.delete('/:id', remove)