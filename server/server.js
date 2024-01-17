const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

let connectedUsers = {};


io.on('connection', (socket) => {

  socket.on("connected", (data) => {
    console.log(`${new Date().toLocaleString()} - Connexion : ${socket.id}, User : ${data.id_user}`);
    connectedUsers[data.id_user] = socket.id;
    console.log(connectedUsers);
  })

  socket.on('disconnected', (data) => {
    console.log(`${new Date().toLocaleString()} - Déconnexion : ${socket.id}, User : ${data.id_user}`);
    delete connectedUsers[data.id_user];
    console.log(connectedUsers);
  });

  socket.on('message', ({ message, id_receiver }) => {
    console.log(`${new Date().toLocaleString()} - Message envoyé par ${message.id_user} à ${id_receiver}`);

    if(connectedUsers[id_receiver]){
      console.log(`${new Date().toLocaleString()} - Message reçu par ${id_receiver}`);
      socket.to(connectedUsers[id_receiver]).emit('message', message);
    }
    console.log(connectedUsers);
  });

  socket.on("addFriend", ({ id_user_ask, id_user_answer }) => {
    console.log(`${new Date().toLocaleString()} - Demande d'ami envoyé par ${id_user_ask} à ${id_user_answer}`);

    if(connectedUsers[id_user_answer]){
      console.log(`${new Date().toLocaleString()} - Demande reçu par ${id_user_answer}`);
      socket.to(connectedUsers[id_user_answer]).emit('addFriend', { id_user_ask, id_user_answer });
    }
    console.log(connectedUsers);
  });

  socket.on("acceptFriend", ({ id_user_ask, id_user_answer }) => {
    console.log(`${new Date().toLocaleString()} - Demande d'ami accepté par ${id_user_answer} à ${id_user_ask}`);

    if(connectedUsers[id_user_ask]){
      console.log(`${new Date().toLocaleString()} - Demande accepté par ${id_user_ask}`);
      socket.to(connectedUsers[id_user_ask]).emit('acceptFriend', { id_user_ask, id_user_answer });
    }
    console.log(connectedUsers);
  });

  socket.on("denyFriend", ({ id_user_ask, id_user_answer }) => {
    console.log(`${new Date().toLocaleString()} - Demande d'ami refusé par ${id_user_answer} à ${id_user_ask}`);

    if(connectedUsers[id_user_ask]){
      console.log(`${new Date().toLocaleString()} - Demande refusé par ${id_user_ask}`);
      socket.to(connectedUsers[id_user_ask]).emit('denyFriend', { id_user_ask, id_user_answer });
    }
    console.log(connectedUsers);
  });

  socket.on("deleteFriend", ({ id_user1, id_user2 }) => {
    console.log(`${new Date().toLocaleString()} - Ami supprimé par ${id_user2} à ${id_user1}`);

    if(connectedUsers[id_user1]){
      console.log(`${new Date().toLocaleString()} - Ami supprimé par ${id_user1}`);
      socket.to(connectedUsers[id_user1]).emit('deleteFriend', { id_user1, id_user2 });
    }
    console.log(connectedUsers);
  });
});

// Routes
const router = require('./router');
app.use('/api', router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
