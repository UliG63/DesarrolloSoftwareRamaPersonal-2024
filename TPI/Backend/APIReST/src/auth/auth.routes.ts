import express from "express";
import { login, register, logout, updateUser } from "./auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.put("/update", updateUser);

export const authRouter = router;
