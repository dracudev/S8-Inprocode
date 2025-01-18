import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST_NAME,
    port: 3306,
    dialect: "mysql",
  }
);

const syncroModel = async () => {
  try {
    // "force: true" elimina la tabla si ya existe y la vuelve a crear
    // "force: false" no hace nada si la tabla ya existe
    // "alter: true" sincroniza las columnas y crea/elimina si es necesario
    await sequelize.sync({ force: false }).then(() => {
      console.log("Syncronized models with database");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await syncroModel();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, testConnection };
