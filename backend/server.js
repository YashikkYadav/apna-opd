require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

const { PORT } = require("./config/config");

const dbConnection = require("./config/db.js");
dbConnection();

const publicPath = path.join(__dirname, "public");
app.use("/public", express.static(publicPath));

const indexRoutes = require("./routes/index.routes");
const Chat = require("./models/chat.js");
app.use("/api", indexRoutes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ doctorPatientId }) => {
    socket.join(doctorPatientId);
    const time = new Date().toLocaleString();
    console.log(
      `\x1b[32m[${time}]\x1b[0m Socket ${socket.id} joined room ${doctorPatientId}`
    );
  });

  socket.on("sendMessage", async ({ doctorPatientId, senderType, message }) => {
    const chat = new Chat({
      doctorPatientId,
      senderType,
      message,
      timestamp: new Date(),
    });

    await chat.save();

    socket.to(doctorPatientId).emit("receiveMessage", {
      doctorPatientId,
      message,
      senderType,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
