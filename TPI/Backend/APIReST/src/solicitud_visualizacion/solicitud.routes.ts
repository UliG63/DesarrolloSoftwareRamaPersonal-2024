import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./solicitud.controller.js";

export const solicitudRouter = Router()

solicitudRouter.get('/',findAll)
solicitudRouter.get('/:id', findOne)
solicitudRouter.post('/', add)
solicitudRouter.put('/:id', update)
solicitudRouter.delete('/:id', remove)