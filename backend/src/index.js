import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import { testConnection } from "./db.js";
import dotenv from "dotenv";
import { insertInitialUserData } from "./start_data.js";
dotenv.config();

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);

//Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing application/json
app.use(express.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

await testConnection();
// Uncomment the line below to insert initial data to the database
await insertInitialUserData();

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/games", gameRoutes);
app.use("/test", testRoutes);

// Server
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
