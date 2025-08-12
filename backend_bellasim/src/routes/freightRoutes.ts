import { Router } from "express";
import * as freightController from "../controllers/freightController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, freightController.create);

router.get("/read", authMiddleware, freightController.read);

router.delete("/delete/:id", authMiddleware, freightController.deleteById);

export default router;
