import express from "express";
import {
  addUserToGame,
  removeUserFromGame,
  getUsersForGame,
  getGamesForUser,
} from "../controllers/userGameController.js";

const router = express.Router();

router.post("/add", addUserToGame);
router.delete("/remove", removeUserFromGame);
router.get("/:gameId/users", getUsersForGame);
router.get("/:userId/games", getGamesForUser);

export default router;
