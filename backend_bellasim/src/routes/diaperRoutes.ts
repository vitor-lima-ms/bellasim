import { Router } from "express";
import { DiaperController } from "../controllers/diaperController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/create-or-update",
  authMiddleware,
  DiaperController.createOrUpdate
);

router.post(
  "/read-by-model-size",
  authMiddleware,
  DiaperController.readByModelSize
);

export default router;
