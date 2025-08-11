import { Router } from "express";
import * as stController from "../controllers/stController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, stController.create);

router.get("/read", authMiddleware, stController.read);

export default router;
