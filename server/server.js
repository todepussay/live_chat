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

// Gestion des connexions
io.on('connection', (socket) => {
  console.log('Nouvelle connexion :', socket.id);

  // Gestion de la réception des messages
  socket.on('message', (data) => {
    console.log('Nouveau message reçu :', data);

    // Diffusion du message à tous les clients connectés
    io.emit('message', data);
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
