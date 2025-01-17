import Game from "../models/gameModel.js";
import { validationResult } from "express-validator";

export const getGames = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Obtener todos los usuarios de la base de datos
    const games = await Game.findAll();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Games List",
      data: games,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener los libros",
    });
  }
};

export const getGameById = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({
        code: -6,
        message: "Libro no encontrado",
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Game Detail",
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener el libro",
    });
  }
};

export const addGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year } = req.body;
    let newGame;
    try {
      newGame = await Game.create({
        title: title,
        year: year,
        user_id: req.user.id_user,
      });
    } catch (error) {
      // Si hay un error de duplicación de clave única (por ejemplo, título duplicado)
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

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Game Added Successfully",
      data: newGame,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al añadir el libro",
    });
  }
};

export const updateGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, year } = req.body;

    // Buscar un usuario por su ID en la base de datos
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({
        code: -3,
        message: "Game no encontrado",
      });
    }

    // Actualizar el correo electrónico y la contraseña del usuario
    game.title = title;
    game.year = year;
    await game.save();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Game Updated Successfully",
      data: game,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al actualizar el libro",
    });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un libro por su ID en la base de datos y eliminarlo
    const deletedGame = await Game.destroy({ where: { id_game: id } });

    // Verificar si el libro fue encontrado y eliminado
    if (!deletedGame) {
      return res.status(404).json({
        code: -100,
        message: "Game Not Found",
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Game Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al eliminar el libro",
    });
  }
};
