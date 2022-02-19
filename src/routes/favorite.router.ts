import { Router } from "express";
import FavoriteController from '../controllers/favorite.controller';

const router = Router();

router.get("/", FavoriteController.getFavorites);

router.get("/:id", FavoriteController.getFavorite)

export default router;