const { db } = require('./../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function login(req, res){
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM t_user WHERE email = ?",
        [email],
        (err, result) => {
            if(result && result.length == 1){
                
                bcrypt.compare(password, result[0].password, (err, match) => {
                    if(match){
                        // Créez un token avec les informations de l'utilisateur
                        const user = { id: result[0].id, email: result[0].email, username: result[0].username };
                        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' }); 
                    
                        // Envoyez le token au client
                        res.json({ success: true, token: token });
                    } else {
                        res.status(401).send({success: false, message: "Mot de passe incorrect"});
                    }
                });

            } else {
                res.status(401).send({success: false, message: "Email incorrect"});
            }
        }
    );
}

module.exports = { login };