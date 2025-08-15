import { Router } from "express";
import { ContributionMarginController } from "../controllers/contributionMarginController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, ContributionMarginController.create);

router.get("/read", authMiddleware, ContributionMarginController.read);

router.get("/read/:id", authMiddleware, ContributionMarginController.readById);

router.put("/update/:id", authMiddleware, ContributionMarginController.update);

router.delete(
  "/delete/:id",
  authMiddleware,
  ContributionMarginController.deleteById
);

export default router;
