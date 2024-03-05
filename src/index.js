import express from "express";
import webRoutes from "./routes/web/index.js";
import mobileRoutes from "./routes/mobile/index.js";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { validatorApiKey } from "./middlewares/validator-apiKey.js";
import { errorHandler, logErrors } from "./middlewares/error.handler.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Habilita el envío de cookies u otros datos de credenciales
};

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
config();

app.use(validatorApiKey);

app.use("/api/web", webRoutes);
app.use("/api/mobile", mobileRoutes);

app.use(logErrors);
app.use(errorHandler);

app.listen(process.env.PORT);
console.log(`Server on port ${process.env.PORT}`);
