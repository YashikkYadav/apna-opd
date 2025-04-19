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

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
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
    console.log(`Socket ${socket.id} joined room ${doctorPatientId}`);
  });

  socket.on("sendMessage", async ({ doctorPatientId, senderType, message }) => {
    const chat = new Chat({
      doctorPatientId,
      senderType,
      message,
      timestamp: new Date(),
    });

    await chat.save();
    console.log({ doctorPatientId, message });

    socket.to(doctorPatientId).emit("receiveMessage", {
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
