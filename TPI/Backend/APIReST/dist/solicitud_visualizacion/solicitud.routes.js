import { Router } from "express";
import { findAll, findAllPending, findOne, add, update, remove, sanitizeSolicitudInput } from "./solicitud.controller.js";
export const solicitudRouter = Router();
solicitudRouter.get('/', findAll);
solicitudRouter.get('/pending', findAllPending);
solicitudRouter.get('/:id', findOne);
solicitudRouter.post('/', sanitizeSolicitudInput, add);
solicitudRouter.put('/:id', sanitizeSolicitudInput, update);
solicitudRouter.patch('/:id', sanitizeSolicitudInput, update);
solicitudRouter.delete('/:id', remove);
//# sourceMappingURL=solicitud.routes.js.map