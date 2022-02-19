import { Router } from "express";
import ProfileController from '../controllers/profile.controller';

const router = Router();

router.get("/", ProfileController.getProfiles);

router.post("/", ProfileController.createProfile);

export default router;