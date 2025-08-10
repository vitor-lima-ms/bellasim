import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir requisições para a API
const corsOptions = {
  origin: "http://localhost",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware para lidar com cookies
app.use(cookieParser());

// Rota de health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Usando as rotas que definimos
import authRoutes from "./routes/authRoutes";
import packagingRoutes from "./routes/packagingRoutes";
import baleBagRoutes from "./routes/baleBagRoutes";
import commissionRoutes from "./routes/commissionRoutes";

app.use("/api/auth", authRoutes);
app.use("/api/bale-bag", baleBagRoutes);
app.use("/api/packaging", packagingRoutes);
app.use("/api/commission", commissionRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${port}`);
});
