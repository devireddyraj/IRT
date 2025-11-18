import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://irt-notification.netlify.app/", // change later to your frontend URL
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("IRT Server is running");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("call-irt", (data) => {
    io.emit("irt-notification", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
