import { Router } from "express";
import { authMiddleware } from "../auth/auth.controller.js";
import { findAll, findAllPending, findByMago, add, grant, reject, sanitizeSolicitudInput } from "./solicitud.controller.js";
export const solicitudRouter = Router();
solicitudRouter.get('/', authMiddleware, findAll);
solicitudRouter.get('/pending', authMiddleware, findAllPending);
solicitudRouter.get('/mago', authMiddleware, findByMago);
solicitudRouter.post('/', authMiddleware, sanitizeSolicitudInput, add);
solicitudRouter.put('/grant/:id', authMiddleware, sanitizeSolicitudInput, grant);
solicitudRouter.put('/reject/:id', authMiddleware, sanitizeSolicitudInput, reject);
//# sourceMappingURL=solicitud.routes.js.map