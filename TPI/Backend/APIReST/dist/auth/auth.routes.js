import express from "express";
import { login, register, logout, validateSession, updateUser } from "./auth.controller.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.put("/update", updateUser);
router.get("/validate", validateSession);
export const authRouter = router;
//# sourceMappingURL=auth.routes.js.map