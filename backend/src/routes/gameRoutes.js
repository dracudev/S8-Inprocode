// src/routes/userRoutes.js
import { Router } from "express";
import {
  getGames,
  getGameById,
  addGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { gameValidator } from "../validations/game.Validation.js";
import { idValidator } from "../validations/generic.Validation.js";
import { getUsersForGame } from "../controllers/userGameController.js";

const router = Router();

router.get("/", authenticateToken(["user", "mod", "admin"]), getGames);
router.get(
  "/:id",
  authenticateToken(["user", "mod", "admin"]),
  idValidator,
  getGameById
);
router.get(
  "/:gameId/users",
  authenticateToken(["user", "mod", "admin"]),
  getUsersForGame
);

router.post("/", authenticateToken(["mod", "admin"]), gameValidator, addGame);

router.patch(
  "/:id",
  authenticateToken(["mod", "admin"]),
  idValidator,
  gameValidator,
  updateGame
);

router.delete(
  "/:id",
  authenticateToken(["mod", "admin"]),
  idValidator,
  deleteGame
);

export default router;
