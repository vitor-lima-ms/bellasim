import { Router } from "express";
import * as commissionController from "../controllers/commissionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, commissionController.create);

router.get("/read", authMiddleware, commissionController.read);

export default router;
