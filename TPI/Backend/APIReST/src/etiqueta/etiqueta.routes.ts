import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./etiqueta.controller.js";
import { existsSync } from "fs";

export const etiquetaRouter = Router()

etiquetaRouter.get('/',findAll)
etiquetaRouter.get('/:id', findOne)
etiquetaRouter.post('/', add)
etiquetaRouter.put('/:id', update)
etiquetaRouter.delete('/:id', remove)