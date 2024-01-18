const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// Fonction pour exécuter un ping toutes les 10 secondes
function keepConnectionAlive() {
    db.query('SELECT 1');
  }
  
  // Exécuter la fonction de ping toutes les 10 secondes
setInterval(keepConnectionAlive, 10000);

module.exports = { db };