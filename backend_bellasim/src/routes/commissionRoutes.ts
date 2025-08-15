import { Router } from "express";
import { CommissionController } from "../controllers/commissionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, CommissionController.create);

router.get("/read", authMiddleware, CommissionController.read);

router.get("/read/:id", authMiddleware, CommissionController.readById);

router.put("/update/:id", authMiddleware, CommissionController.update);

router.delete("/delete/:id", authMiddleware, CommissionController.deleteById);

export default router;
