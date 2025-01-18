import UserGame from "../models/userGameModel.js";
import User from "../models/userModel.js";
import Game from "../models/gameModel.js";

// Add a user to a game
export const addUserToGame = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    const userGame = await UserGame.create({ userId, gameId });
    res.status(201).json(userGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a user from a game
export const removeUserFromGame = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    await UserGame.destroy({ where: { userId, gameId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users for a game
export const getUsersForGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const users = await User.findAll({
      attributes: ["id_user", "username"],
      include: {
        model: Game,
        where: { id_game: gameId },
        through: { attributes: [] },
        attributes: [], // Exclude the game from the response
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all games for a user
export const getGamesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const games = await Game.findAll({
      attributes: ["id_game", "title", "platform"],
      include: {
        model: User,
        where: { id_user: userId },
        through: { attributes: [] },
        attributes: ["username"],
      },
    });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
