import { Router } from "express";
import {
  getUserById,
  getUsers,
  uploadPhoto,
} from "../controllers/userController.js";
// import { authenticateToken } from "../middlewares/authenticateToken.js";
import { uploadFileMiddleware } from "../middlewares/upload.js";
import {
  addUserToGame,
  getGamesForUser,
  removeUserFromGame,
} from "../controllers/userGameController.js";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/:userId/games", getGamesForUser);

router.post("/upload-photo", uploadFileMiddleware, uploadPhoto);
router.post("/add", addUserToGame);
router.delete("/remove", removeUserFromGame);

export default router;
