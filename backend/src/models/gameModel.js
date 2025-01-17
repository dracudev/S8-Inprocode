import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const allowedPlatforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"];

const Game = sequelize.define(
  "Game",
  {
    id_game: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER(4),
      //allowNull defaults to true
    },
    photo: {
      type: DataTypes.STRING(30),
    },
    platform: {
      type: DataTypes.STRING(30),
      allowNull: false,
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
  },
  {
    indexes: [{ unique: true, fields: ["title"] }],
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default Game;
