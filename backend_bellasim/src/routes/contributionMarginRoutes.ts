import { Router } from "express";
import * as contributionMarginController from "../controllers/contributionMarginController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, contributionMarginController.create);

router.get("/read", authMiddleware, contributionMarginController.read);

router.delete(
  "/delete/:id",
  authMiddleware,
  contributionMarginController.deleteById
);

export default router;
