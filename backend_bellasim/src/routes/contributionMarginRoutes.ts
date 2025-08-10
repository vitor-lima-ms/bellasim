import { Router } from "express";
import * as contributionMarginController from "../controllers/contributionMarginController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, contributionMarginController.create);

export default router;
