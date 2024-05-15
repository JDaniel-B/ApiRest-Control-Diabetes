import express from "express";
import webRoutes from "./routes/web/index.js";
import mobileRoutes from "./routes/mobile/index.js";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { validatorApiKey } from "./middlewares/validator-apiKey.js";
import { errorHandler, logErrors } from "./middlewares/error.handler.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { rooms } from "./utils/rooms.js";
import { v4 as uuidv4 } from "uuid";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Habilita el envío de cookies u otros datos de credenciales
};

const app = express();
const server = createServer(app);
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

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
const ROOMS = {};

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("joinRoom", (roomId, userId) => {
    if(!ROOMS[roomId]){
      ROOMS[roomId] = []
    }

    if(ROOMS[roomId].length >= 2){
      socket.emit('error', 'maximo de usuarios')
      console.log('error, maximo de usuarios`')
    } else {
      socket.join(roomId)

      ROOMS[roomId].push(userId)

      io.to(roomId).emit('user joined')
    }
    console.log(ROOMS)
  });

  // io.to("some room").emit("some event", "Welcome to the room");

  socket.on("disconnect", () => console.log("user desconectado"));

  socket.on("chat-message", (data) => {
    console.log(msg);
    io.to(data.idRoom).emit("chat-message", {
      message: data.msg,
      user: socket.id,
    });
  });
});

server.listen(process.env.PORT);
console.log(`Server on port ${process.env.PORT}`);
