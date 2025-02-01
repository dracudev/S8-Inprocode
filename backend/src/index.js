import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import { testConnection } from "./db.js";
import dotenv from "dotenv";
// import { insertInitialUserData } from "./start_data.js";

dotenv.config();

const app = express();
app.disable("x-powered-by");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://s8-inprocode-frontend.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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
// await insertInitialUserData();

// Routes
// app.use("/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Local server
/*const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});*/

export default app;
