import { Router } from "express";
import { findAll, findAllPending, findByMago, findOne, add, grant, update, remove, reject, sanitizeSolicitudInput } from "./solicitud.controller.js";
export const solicitudRouter = Router();
solicitudRouter.get('/', findAll);
solicitudRouter.get('/pending', findAllPending);
solicitudRouter.get('/mago/:id', findByMago);
solicitudRouter.get('/:id', findOne);
solicitudRouter.post('/', sanitizeSolicitudInput, add);
solicitudRouter.put('/:id', sanitizeSolicitudInput, update);
solicitudRouter.put('/grant/:id', sanitizeSolicitudInput, grant);
solicitudRouter.put('/reject/:id', sanitizeSolicitudInput, reject);
solicitudRouter.patch('/:id', sanitizeSolicitudInput, update);
solicitudRouter.delete('/:id', remove);
//# sourceMappingURL=solicitud.routes.js.map