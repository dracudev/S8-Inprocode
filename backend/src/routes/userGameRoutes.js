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
router.get("/game/:gameId/users", getUsersForGame);
router.get("/user/:userId/games", getGamesForUser);

export default router;
