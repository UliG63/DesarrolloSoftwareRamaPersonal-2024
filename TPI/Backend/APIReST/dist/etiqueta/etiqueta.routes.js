import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./etiqueta.controller.js";
export const etiquetaRouter = Router();
etiquetaRouter.get('/', findAll);
etiquetaRouter.get('/:id', findOne);
etiquetaRouter.post('/', add);
etiquetaRouter.put('/:id', update);
etiquetaRouter.delete('/:id', remove);
//# sourceMappingURL=etiqueta.routes.js.map