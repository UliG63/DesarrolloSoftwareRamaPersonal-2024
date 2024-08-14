import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./tipo_hechizo.controller.js";

export const tipo_hechizoRouter = Router()

tipo_hechizoRouter.get('/',findAll)
tipo_hechizoRouter.get('/:id', findOne)
tipo_hechizoRouter.post('/', add)
tipo_hechizoRouter.put('/:id', update)
tipo_hechizoRouter.delete('/:id', remove)