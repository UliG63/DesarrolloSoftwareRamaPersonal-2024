import { Router } from "express";
import { findAll, findOne, getAvailableForVisualizacion, add, update, remove, findPermitedForUser } from "./hechizo.controller.js";
export const hechizoRouter = Router();
hechizoRouter.get('/all/:id', findAll);
hechizoRouter.get('/:id', findOne);
hechizoRouter.get('/visualizacion/:id', getAvailableForVisualizacion);
hechizoRouter.get('/permitidos/:id', findPermitedForUser);
hechizoRouter.post('/', add);
hechizoRouter.put('/:id', update);
hechizoRouter.delete('/:id', remove);
//# sourceMappingURL=hechizo.routes.js.map