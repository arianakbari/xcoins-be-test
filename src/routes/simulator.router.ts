import { Router } from "express";
import SimulatorController from "../controllers/simulator.controller";

const router = Router();

router.get("/", SimulatorController.getSimulators);

router.post("/", SimulatorController.createSimulator);

router.get("/:profile_id", SimulatorController.getSimulatorsByProfile);

export default router;