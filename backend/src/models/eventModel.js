import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const allowedCategories = ["Meeting", "Conference", "Game Jam", "Competition"];
const Event = sequelize.define(
  "Event",
  {
    id_event: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
      get() {
        const rawValue = this.getDataValue("category");
        if (!rawValue) {
          return [];
        }
        return rawValue.split(",");
      },
      set(value) {
        if (!Array.isArray(value)) {
          value = [value];
        }
        value.forEach((platform) => {
          if (!allowedCategories.includes(platform)) {
            throw new Error(`Invalid category: ${platform}`);
          }
        });
        this.setDataValue("category", value.join(","));
      },
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      defaultValue: 0,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      defaultValue: 0,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category_color: {
      type: DataTypes.STRING(7),
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    timestamps: false,
  }
);

export default Event;
