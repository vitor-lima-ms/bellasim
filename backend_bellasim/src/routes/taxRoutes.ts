import { Router } from "express";
import * as taxController from "../controllers/taxController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, taxController.create);

router.get("/read", authMiddleware, taxController.read);

export default router;
