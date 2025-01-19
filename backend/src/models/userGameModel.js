import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import User from "./userModel.js";
import Game from "./gameModel.js";

// Join table for User and Game
const UserGame = sequelize.define(
  "UserGame",
  {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id_user",
      },
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: "id_game",
      },
    },
  },
  { timestamps: false }
);

User.belongsToMany(Game, { through: UserGame, foreignKey: "userId" });
Game.belongsToMany(User, { through: UserGame, foreignKey: "gameId" });

export default UserGame;
