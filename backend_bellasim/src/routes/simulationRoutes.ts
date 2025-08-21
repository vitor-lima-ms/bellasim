import { Router } from "express";
import { SimulationController } from "../controllers/simulationController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/register-simulation",
  authMiddleware,
  SimulationController.registerSimulation
);

router.get("/read", authMiddleware, SimulationController.read);

export default router;
