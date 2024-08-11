import { Router } from "express";
import { sanitizeEmpleadoInput, findAll } from "./empleado.controller.js";

export const empleadoRouter = Router()

empleadoRouter.get('/',findAll)