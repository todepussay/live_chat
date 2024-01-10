const express = require('express');
const app = express();
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const router = require('./router');
app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));