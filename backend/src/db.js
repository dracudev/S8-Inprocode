import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false, // Set to true for debugging
    })
  : new Sequelize(
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
    // "force: true" deletes the table if it already exists
    // "force: false" does not delete the table if it already exists
    // "alter: true" synchronizes the table with the model and updates the table
    await sequelize.sync({}).then(() => {
      console.log("Syncronized models with database");
    });
  } catch (error) {
    console.error("Unable to sync models", error);
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
