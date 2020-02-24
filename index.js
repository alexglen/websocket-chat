const express = require("express");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io").listen(server);
server.listen(4000);
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

const connections = [];

io.sockets.on("connection", socket => {
  console.log("Успешное соединениe");
  connections.push(socket);
  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Соединение прервано");
  });
  socket.on("send mess", function(data) {
    console.log(data, "DATA");
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name || "noname",
      className: data.className
    });
  });
});