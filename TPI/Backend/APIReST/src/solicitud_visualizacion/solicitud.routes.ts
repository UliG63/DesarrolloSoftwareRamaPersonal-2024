import { Router } from "express";
import { findAll,findAllPending, findOne, add, publish , update, remove, reject ,sanitizeSolicitudInput } from "./solicitud.controller.js";

export const solicitudRouter = Router()

solicitudRouter.get('/',findAll)
solicitudRouter.get('/pending',findAllPending)
solicitudRouter.get('/:id', findOne)
solicitudRouter.post('/',sanitizeSolicitudInput, add)
solicitudRouter.put('/:id',sanitizeSolicitudInput, update)
solicitudRouter.put('/publish/:id',sanitizeSolicitudInput,publish)
solicitudRouter.put('/reject/:id',sanitizeSolicitudInput,reject)
solicitudRouter.patch('/:id', sanitizeSolicitudInput, update)
solicitudRouter.delete('/:id', remove)