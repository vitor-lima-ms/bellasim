import { Router } from "express";
import * as packagingController from "../controllers/packagingController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, packagingController.create);

router.get("/read", authMiddleware, packagingController.read);

router.delete("/delete", authMiddleware, packagingController.deleteById);

export default router;
