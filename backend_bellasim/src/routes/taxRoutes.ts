import { Router } from "express";
import * as taxController from "../controllers/taxController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, taxController.create);

router.get("/read", authMiddleware, taxController.read);

router.get("/read/:id", authMiddleware, taxController.readById);

router.put("/update/:id", authMiddleware, taxController.update);

router.delete("/delete/:id", authMiddleware, taxController.deleteById);

export default router;
