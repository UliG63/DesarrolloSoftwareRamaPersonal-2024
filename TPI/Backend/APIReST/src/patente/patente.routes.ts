import { Router } from "express";
import { upload } from "../shared/multerConfig.js";
import { sanitizePatenteInput, findAll, findOne, add, update, remove, publish, reject, findAllPending,findByMago } from "./patente.controller.js";

export const patenteRouter = Router()

patenteRouter.post('/',upload.single('imagen'), sanitizePatenteInput, add);
patenteRouter.get('/pending',findAllPending)
patenteRouter.get('/:idMago',findByMago)
patenteRouter.get('/',findAll)
patenteRouter.get('/:id', findOne)
patenteRouter.put('/:id',sanitizePatenteInput, update)
patenteRouter.put('/publish/:id',sanitizePatenteInput,publish)
patenteRouter.put('/reject/:id',sanitizePatenteInput,reject)
patenteRouter.delete('/:id', remove)