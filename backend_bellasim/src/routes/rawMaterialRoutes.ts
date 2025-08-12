import { Router } from "express";
import * as rawMaterialController from "../controllers/rawMaterialController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, rawMaterialController.create);

router.get("/read", authMiddleware, rawMaterialController.read);

router.delete("/delete/:id", authMiddleware, rawMaterialController.deleteById);

export default router;
