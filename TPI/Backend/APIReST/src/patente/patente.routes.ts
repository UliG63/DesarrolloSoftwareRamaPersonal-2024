import { Router } from "express";
import { sanitizePatenteInput,findAll, findOne, add, update, remove, publish, reject, findAllPending } from "./patente.controller.js";

export const patenteRouter = Router()

patenteRouter.get('/pending',findAllPending)
patenteRouter.get('/',findAll)
patenteRouter.get('/:id', findOne)
patenteRouter.post('/',sanitizePatenteInput, add)
//patenteRouter.put('//:id',sanitizePatenteInput, update)
patenteRouter.put('/publish/:id',sanitizePatenteInput,publish)
patenteRouter.put('/reject/:id',sanitizePatenteInput,reject)
patenteRouter.delete('/:id', remove)
