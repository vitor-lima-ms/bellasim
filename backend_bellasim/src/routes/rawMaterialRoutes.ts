import { Router } from "express";
import { RawMaterialController } from "../controllers/rawMaterialController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, RawMaterialController.create);

router.get("/read", authMiddleware, RawMaterialController.read);

router.get("/read/:id", authMiddleware, RawMaterialController.readById);

router.put("/update/:id", authMiddleware, RawMaterialController.update);

router.delete("/delete/:id", authMiddleware, RawMaterialController.deleteById);

export default router;
