import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import User from "./userModel.js";

const Game = sequelize.define(
  "Game",
  {
    id_game: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER(4),
      //allowNull defaults to true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    indexes: [{ unique: true, fields: ["title"] }],
    timestamps: true, // Activa la creación automática de createdAt y updatedAt
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
User.hasMany(Game, { foreignKey: "user_id" });
Game.belongsTo(User, { foreignKey: "user_id" });
//Ten en cuenta que hasMany solo establece la relación desde el modelo principal hacia el secundario.
//En algunos casos, eso puede ser suficiente si no necesitas navegar desde el secundario hacia el principal.
//Sin embargo, si necesitas la relación inversa(por ejemplo, obtener el usuario al que pertenece un libro), entonces necesitarás belongsTo.

export default Game;
