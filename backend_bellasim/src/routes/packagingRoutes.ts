import { Router } from "express";
import { PackagingController } from "../controllers/packagingController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, PackagingController.create);

router.get("/read", authMiddleware, PackagingController.read);

router.get("/read/:id", authMiddleware, PackagingController.readById);

router.put("/update/:id", authMiddleware, PackagingController.update);

router.delete("/delete/:id", authMiddleware, PackagingController.deleteById);

export default router;
