import { Router } from "express";
import { findAll } from "./empleado.controller.js";
export const empleadoRouter = Router();
empleadoRouter.get('/', findAll);
//# sourceMappingURL=empleado.routes.js.map