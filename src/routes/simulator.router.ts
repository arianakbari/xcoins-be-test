import { Router } from "express";
import { SimulatorController } from "../controllers";
import validators from "../validators";

const router = Router();

// @ts-ignore
router.get("/", validators.getSimulators, SimulatorController.getSimulators);

router.post(
    "/",
    validators.createSimulator,
    SimulatorController.createSimulator
);

router.get(
    "/:profileId",
    validators.getSimulatorsByProfile,
    SimulatorController.getSimulatorsByProfile
);

export default router;
