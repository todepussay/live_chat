const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer();
const io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// io.on('connection', (socket) => {
//   console.log('Un utilisateur s\'est connecté');

//   socket.on('message', (message) => {
//     console.log('Message reçu :', message);

//     io.emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('Un utilisateur s\'est déconnecté');
//   });
// });

const router = require('./router');
app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));