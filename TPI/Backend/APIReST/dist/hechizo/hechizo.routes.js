import { Router } from "express";
import { findAll, findOne, getAvailableForVisualizacion, findPermitedForUser } from "./hechizo.controller.js";
import { authMiddleware } from "../auth/auth.controller.js";
export const hechizoRouter = Router();
hechizoRouter.get('/all', authMiddleware, findAll);
hechizoRouter.get('/visualizacion', authMiddleware, getAvailableForVisualizacion);
hechizoRouter.get('/permitidos', authMiddleware, findPermitedForUser);
hechizoRouter.get('/:id', findOne);
//# sourceMappingURL=hechizo.routes.js.map