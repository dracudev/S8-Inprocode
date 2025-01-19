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
// Configura el middleware CORS para que peuda recibir solicitudes de POST, PUT, DELETE, UPDATE, etc.
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3306", "http://localhost:3000"],
  })
);

//header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios en el cuerpo de la solicitud

await testConnection();
await insertInitialUserData();

// Configurar rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/game", gameRoutes);

app.use("/test", testRoutes);

// Iniciar el servidor
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
