import { Request } from "express";
import { Magos } from "../magos/magos.entity.js";

export interface AuthRequest extends Request {
    user?: Magos;
}