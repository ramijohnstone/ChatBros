const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("3002", () => {
  console.log("Server fonctionne sur le port 3002...");
});

io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("rejoin-salle", data => {
    socket.join(data);
    console.log(" Un Utilisateur à rejoint la salle:" + data);
  });

  socket.on("envoi-message", data => {
    console.log(data);
    socket.to(data.salle).emit("message-reçu", data.contient);
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur Déconnecter");
  });
});
