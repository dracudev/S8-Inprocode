import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const allowedPlatforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"];
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

const Game = sequelize.define("Game", {
  id_game: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  year: {
    type: DataTypes.INTEGER,
    //allowNull defaults to true
  },
  photo: {
    type: DataTypes.STRING(500),
  },
  platform: {
    type: DataTypes.STRING(200),
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("platform");
      if (!rawValue) {
        return [];
      }
      return rawValue.split(",");
    },
    set(value) {
      // Ensure value is an array
      if (!Array.isArray(value)) {
        value = [value];
      }
      // Validate each platform
      value.forEach((platform) => {
        if (!allowedPlatforms.includes(platform)) {
          throw new Error(`Invalid platform: ${platform}`);
        }
      });
      this.setDataValue("platform", value.join(","));
    },
  },
  genre: {
    type: DataTypes.STRING(300),
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("genre");
      if (!rawValue) {
        return [];
      }
      return rawValue.split(",");
    },
    set(value) {
      // Ensure value is an array
      if (!Array.isArray(value)) {
        value = [value];
      }
      // Validate each genre
      value.forEach((genre) => {
        if (!allowedGenres.includes(genre)) {
          throw new Error(`Invalid genre: ${genre}`);
        }
      });
      this.setDataValue("genre", value.join(","));
    },
  },
});

export default Game;
