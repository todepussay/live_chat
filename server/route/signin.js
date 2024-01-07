const { db } = require('../db');
const bcrypt = require('bcrypt');
const login = require('./login');

function signin(req, res){
    const { username, email, password } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    db.query(
        "SELECT * FROM t_user WHERE email = ?",
        [email],
        (err, result) => {
            if(result && result.length == 1){
                return res.send({success: false, message: "Cet email est déjà utilisé"});
            }
        }
    )

    bcrypt.hash(password, 10, (err, hash) => {
        db.query(
            "INSERT INTO t_user (username, email, password, create_time, update_time) VALUES (?, ?, ?, NOW(), NOW())",
            [username, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.send({success: false, message: "Une erreur s'est produite"});
                } else {
                    console.log(`${new Date().toLocaleString()} - ${username}(${result.insertId}) s'est inscrit`);
                    return login.login(req, res);
                }
            }
        );
    });
}

module.exports = { signin };