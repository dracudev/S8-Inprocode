import Game from "../models/gameModel.js";
import { validationResult } from "express-validator";

export const getGames = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const games = await Game.findAll();

    res.status(200).json({
      code: 1,
      message: "Games List",
      data: games,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the games",
    });
  }
};

export const getGameById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({
        code: -6,
        message: "Game Not Found",
      });
    }

    res.status(200).json({
      code: 1,
      message: "Game Detail",
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the game",
    });
  }
};

export const addGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year, photo, platform, genre } = req.body;
    let newGame;
    try {
      newGame = await Game.create({
        title: title,
        year: year,
        photo: photo,
        platform: platform,
        genre: genre,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          code: -61,
          message: "Duplicate Game Title",
        });
      }
    }

    if (!newGame) {
      return res.status(404).json({
        code: -6,
        message: "Error When Adding The Game",
      });
    }

    res.status(200).json({
      code: 1,
      message: "Game Added Successfully",
      data: newGame,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while adding the game",
    });
  }
};

export const updateGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, year, photo, platform, genre } = req.body;

    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({
        code: -3,
        message: "Game not found",
      });
    }

    game.title = title;
    game.year = year;
    game.photo = photo;
    game.platform = platform;
    game.genre = genre;
    await game.save();

    res.status(200).json({
      code: 1,
      message: "Game Updated Successfully",
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while updating the game",
    });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const deletedGame = await Game.destroy({ where: { id_game: id } });

    if (!deletedGame) {
      return res.status(404).json({
        code: -100,
        message: "Game Not Found",
      });
    }

    res.status(200).json({
      code: 1,
      message: "Game Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while deleting the game",
    });
  }
};
