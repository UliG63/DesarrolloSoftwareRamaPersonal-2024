import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./hechizo.controller.js";

export const hechizoRouter = Router()

hechizoRouter.get('/',findAll)
hechizoRouter.get('/:id', findOne)
hechizoRouter.post('/', add)
hechizoRouter.put('/:id', update)
hechizoRouter.delete('/:id', remove)