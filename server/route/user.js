const { db } = require('../db');
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour le téléchargement d'avatar
// const storage = multer.diskStorage({
//   destination: '../uploads/',
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, );
//   },
// });
  
// const upload = multer({ storage: storage });

function updateCompte(req, res){

    const { id, username, password, avatar } = req.body;

    if(avatar != null){

    }
}

module.exports = {
    updateCompte
}