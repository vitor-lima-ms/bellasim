import { Router } from "express";
import { FreightController } from "../controllers/freightController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, FreightController.create);

router.get("/read", authMiddleware, FreightController.read);

router.get("/read/:id", authMiddleware, FreightController.readById);

router.put("/update/:id", authMiddleware, FreightController.update);

router.delete("/delete/:id", authMiddleware, FreightController.deleteById);

export default router;
