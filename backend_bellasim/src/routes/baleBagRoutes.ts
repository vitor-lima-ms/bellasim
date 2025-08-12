import { Router } from "express";
import * as baleBagController from "../controllers/baleBagController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, baleBagController.create);

router.get("/read", authMiddleware, baleBagController.read);

router.get("/read/:id", authMiddleware, baleBagController.readById);

router.put("/update/:id", authMiddleware, baleBagController.update);

router.delete("/delete/:id", authMiddleware, baleBagController.deleteById);

export default router;
