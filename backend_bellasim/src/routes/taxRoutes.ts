import { Router } from "express";
import { TaxController } from "../controllers/taxController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, TaxController.create);

router.get("/read", authMiddleware, TaxController.read);

router.get("/read/:id", authMiddleware, TaxController.readById);

router.put("/update/:id", authMiddleware, TaxController.update);

router.delete("/delete/:id", authMiddleware, TaxController.deleteById);

export default router;
