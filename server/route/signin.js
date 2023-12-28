const { db } = require('./../db');
const bcrypt = require('bcrypt');

function signin(req, res){
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        db.query(
            "INSERT INTO t_user (username, email, password, create_time, update_time) VALUES (?, ?, ?, NOW(), NOW())",
            [username, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({success: false, message: "Une erreur s'est produite"});
                } else {
                    res.status(200).send({success: true, message: "Utilisateur créé avec succès"});
                }
            }
        );
    });
}

module.exports = { signin };