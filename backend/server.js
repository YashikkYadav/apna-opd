require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const server = http.createServer(app);


const { google } = require("googleapis");
require("dotenv").config();

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

async function main() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // important for refresh_token
    prompt: "consent",      // forces refresh_token on every run
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this url:", url);

  // Copy the "code" from Google's redirect URL after login
  // Then run: node get-refresh-token.js <CODE>
  const code = process.argv[2];
  if (!code) {
    console.log("\nAfter visiting the URL above, copy the ?code=XXX and run:\n");
    console.log("   node get-refresh-token.js YOUR_CODE_HERE\n");
    return;
  }

  const { tokens } = await oauth2Client.getToken(code);
  console.log("Tokens received:\n", tokens);
  console.log("\n⚠️ Save the refresh_token in your .env like this:");
  console.log("GOOGLE_REFRESH_TOKEN=" + tokens.refresh_token);
}

main().catch(console.error);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.options('*', cors()); // Handles FormData preflight requests
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
