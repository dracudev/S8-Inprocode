import { body } from "express-validator";

export const gameValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be a string")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters"),
  body("year")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Year should be a valid year"),
  body("platform")
    .exists()
    .withMessage("Platform is required")
    .isArray()
    .withMessage("Platform should be an array")
    .custom((platforms) => {
      if (platforms.length === 0) {
        throw new Error("Platform should have at least one value");
      }
      return true;
    })
    .custom((platforms) => {
      const allowedPlatforms = [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo",
        "Mobile",
      ];
      const invalidPlatforms = platforms.filter(
        (platform) => !allowedPlatforms.includes(platform)
      );
      if (invalidPlatforms.length > 0) {
        throw new Error(`Invalid platform(s): ${invalidPlatforms.join(", ")}`);
      }
      return true;
    }),
  body("genre")
    .exists()
    .withMessage("Genre is required")
    .isArray()
    .withMessage("Genre should be an array")
    .custom((genres) => {
      if (genres.length === 0) {
        throw new Error("Genre should have at least one value");
      }
      return true;
    })
    .custom((genres) => {
      const allowedGenres = [
        "Action",
        "Adventure",
        "RPG",
        "Strategy",
        "Simulation",
        "Sports",
        "Puzzle",
        "Idle",
        "FPS",
        "VR",
        "Roguelike",
        "Sci-Fi",
        "Racing",
        "Open World",
        "TPS",
        "Platformer",
        "Multiplayer",
        "Social",
        "Shooter",
        "Battle Royale",
        "Party",
        "Augmented Reality",
      ];
      const invalidGenres = genres.filter(
        (genre) => !allowedGenres.includes(genre)
      );
      if (invalidGenres.length > 0) {
        throw new Error(`Invalid genre(s): ${invalidGenres.join(", ")}`);
      }
      return true;
    }),
];
