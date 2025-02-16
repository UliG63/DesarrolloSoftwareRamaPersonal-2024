import { Router } from "express";
import { upload } from "../shared/multerConfig.js";
import { authMiddleware } from "../auth/auth.controller.js";
import { sanitizePatenteInput, findAll, add, publish, reject, findAllPending, findByMago } from "./patente.controller.js";
export const patenteRouter = Router();
patenteRouter.post('/', authMiddleware, upload.single('imagen'), sanitizePatenteInput, add);
patenteRouter.get('/', authMiddleware, findAll);
patenteRouter.get('/pending', authMiddleware, findAllPending);
patenteRouter.get('/mago', authMiddleware, findByMago);
patenteRouter.put('/publish/:id', authMiddleware, sanitizePatenteInput, publish);
patenteRouter.put('/reject/:id', authMiddleware, sanitizePatenteInput, reject);
//# sourceMappingURL=patente.routes.js.map