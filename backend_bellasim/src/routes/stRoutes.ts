import { Router } from "express";
import { StController } from "../controllers/stController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, StController.create);

router.get("/read", authMiddleware, StController.read);

router.get("/read/:id", authMiddleware, StController.readById);

router.put("/update/:id", authMiddleware, StController.update);

router.delete("/delete/:id", authMiddleware, StController.deleteById);

export default router;
