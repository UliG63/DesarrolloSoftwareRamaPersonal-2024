import { Router } from "express";
import { sanitizeMagoInput, findAll, findOne, add, update, remove } from "./magos.controller.js";
export const magoRouter = Router();
magoRouter.get('/', findAll);
magoRouter.get('/:id', findOne);
magoRouter.post('/', sanitizeMagoInput, add);
magoRouter.put('/:id', sanitizeMagoInput, update);
magoRouter.patch('/:id', sanitizeMagoInput, update);
magoRouter.delete('/:id', remove);
//# sourceMappingURL=magos.routes.js.map