import { Router } from "express";
import { ProfileController } from "../controllers";
import validators from "../validators";

const router = Router();

// @ts-ignore
router.get("/", validators.getProfiles, ProfileController.getProfiles);

router.post("/", validators.createProfile, ProfileController.createProfile);

export default router;
