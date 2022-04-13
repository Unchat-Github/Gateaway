const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*",
  methods: ["GET", "POST"],
});

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "There is nothing here..." });
});

io.on("connection", (socket) => {
  socket.on("MESSAGE_CREATE", (payload) => {
    io.sockets.emit("MESSAGE_CREATE", payload);
  });

  socket.on("NOTIFICATION_CREATE", (payload) => {
    io.sockets.emit("NOTIFICATION_CREATE", payload);
  });
});

server.listen(5000, () => {
  console.log(`Listening on PORT : ${5000}`);
});
