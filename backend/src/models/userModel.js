import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../db.js";

const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    roles: {
      type: DataTypes.STRING(30),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("roles");
        if (!rawValue) {
          console.log("Rol value is undefined or null");
          return [];
        }
        return rawValue.split(",");
      },
      set(value) {
        this.setDataValue("roles", value.join(","));
      },
    },
    photo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps if not needed
  }
);

export default User;
