import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeMagoInput } from "./magos.controller.js";
export const magosRouter = Router();
magosRouter.get('/', findAll);
magosRouter.get('/:id', findOne);
magosRouter.post('/', sanitizeMagoInput, add);
magosRouter.put('/:id', sanitizeMagoInput, update);
magosRouter.patch('/:id', sanitizeMagoInput, update);
magosRouter.delete('/:id', remove);
//# sourceMappingURL=magos.routes.js.map