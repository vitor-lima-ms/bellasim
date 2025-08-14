import { Router } from "express";
import { BaleBagController } from "../controllers/baleBagController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, BaleBagController.create);

router.get("/read", authMiddleware, BaleBagController.read);

router.get("/read/:id", authMiddleware, BaleBagController.readById);

router.put("/update/:id", authMiddleware, BaleBagController.update);

router.delete("/delete/:id", authMiddleware, BaleBagController.deleteById);

export default router;
