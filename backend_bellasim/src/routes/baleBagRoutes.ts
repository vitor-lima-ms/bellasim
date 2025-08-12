import { Router } from "express";
import * as baleBagController from "../controllers/baleBagController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, baleBagController.create);

router.get("/read", authMiddleware, baleBagController.read);

router.delete("/delete", authMiddleware, baleBagController.deleteById)

export default router;
