import { Router } from "express";
import * as baleBagController from "../controllers/baleBagController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, baleBagController.create);

export default router;
