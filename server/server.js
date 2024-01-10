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
