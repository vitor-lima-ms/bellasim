import { Router } from "express";
import { AuthController } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authMiddleware, AuthController.register);

router.post("/login", AuthController.login);

router.get("/status", authMiddleware, AuthController.status);

router.post("/logout", AuthController.logout);

router.post("/forgot-password", AuthController.forgotPassword);

router.put("/reset-password/:token", AuthController.resetPassword);

export default router;
