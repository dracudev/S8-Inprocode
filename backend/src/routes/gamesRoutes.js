// src/routes/userRoutes.js
import { Router } from "express";
import {
  getGames,
  getGameById,
  addGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";
// import { authenticateToken } from "../middlewares/authenticateToken.js";
import { gameValidator } from "../validations/game.Validation.js";
import { idValidator } from "../validations/generic.Validation.js";
import { getUsersForGame } from "../controllers/userGameController.js";

const router = Router();

// router.get("/", authenticateToken(["user", "mod", "admin"]), getGames);
router.get("/", getGames);
router.get("/:id", idValidator, getGameById);
router.get("/:gameId/users", getUsersForGame);

router.post("/", gameValidator, addGame);

router.patch("/:id", idValidator, gameValidator, updateGame);

router.delete("/:id", idValidator, deleteGame);

export default router;
