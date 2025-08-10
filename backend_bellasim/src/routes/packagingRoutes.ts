import { Router } from "express";
import * as packagingController from "../controllers/packagingController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, packagingController.create);

export default router;
