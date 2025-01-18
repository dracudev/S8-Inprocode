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

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get("/", authenticateToken(["user"]), getGames);
router.get(
  "/:id",
  authenticateToken(["user", "mod", "admin"]),
  idValidator,
  getGameById
);

router.post(
  "/",
  authenticateToken(["user", "mod", "admin"]),
  gameValidator,
  addGame
);

router.patch(
  "/:id",
  authenticateToken(["user", "mod", "admin"]),
  idValidator,
  gameValidator,
  updateGame
);

router.delete(
  "/:id",
  authenticateToken(["user", "mod", "admin"]),
  idValidator,
  deleteGame
);

export default router;
