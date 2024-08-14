import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./institucion.controller.js";

export const institucionRouter = Router()

institucionRouter.get('/',findAll)
institucionRouter.get('/:id', findOne)
institucionRouter.post('/', add)
institucionRouter.put('/:id', update)
institucionRouter.delete('/:id', remove)