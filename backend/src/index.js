import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { testConnection } from "./db.js";
import dotenv from "dotenv";
// import { insertInitialUserData } from "./start_data.js";

dotenv.config();

const app = express();
app.disable("x-powered-by");

// CORS configuration
const corsOptions = {
  origin: [
    "https://s8-inprocode-frontend.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));

// Pre-flight requests
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await testConnection();
// await insertInitialUserData();

// Routes
// app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/test", testRoutes);
app.use("/api/event", eventRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Local server
const PORT = process.env.PORT ?? 3000;

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
}

export default app;
