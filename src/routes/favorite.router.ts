import { Router } from "express";
import { FavoriteController } from "../controllers";
import validators from "../validators";

const router = Router();

// @ts-ignore
router.get("/", validators.getFavorites, FavoriteController.getFavorites);

// @ts-ignore
router.get("/:id", validators.getFavorite, FavoriteController.getFavorite);

export default router;
