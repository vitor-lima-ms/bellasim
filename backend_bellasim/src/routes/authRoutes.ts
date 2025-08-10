import { Router } from "express";
import * as authController from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authMiddleware, authController.register);

router.post("/login", authController.login);

router.get("/status", authMiddleware, authController.status);

router.post("/logout", authController.logout);

router.post("/forgot-password", authController.forgotPassword);

router.put("/reset-password/:token", authController.resetPassword);

export default router;
