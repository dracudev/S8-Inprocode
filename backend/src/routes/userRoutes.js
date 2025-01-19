import { Router } from "express";
import { getUser, uploadPhoto } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { uploadFileMiddleware } from "../middlewares/upload.js";
import {
  addUserToGame,
  getGamesForUser,
  removeUserFromGame,
} from "../controllers/userGameController.js";

const router = Router();

router.get("/", authenticateToken(["user", "mod", "admin"]), getUser);
router.get(
  "/:userId/games",
  authenticateToken(["user", "mod", "admin"]),
  getGamesForUser
);

router.post(
  "/upload-photo",
  authenticateToken(["user", "mod", "admin"]),
  uploadFileMiddleware,
  uploadPhoto
);
router.post("/add", authenticateToken(["user", "mod", "admin"]), addUserToGame);
router.delete(
  "/remove",
  authenticateToken(["user", "mod", "admin"]),
  removeUserFromGame
);

export default router;
