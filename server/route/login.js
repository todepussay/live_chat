const { db } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

function login(req, res){
    const { email, password } = req.body;
    
    db.query(
        "SELECT * FROM t_user WHERE email = ?",
        [email],
        (err, result) => {
            if(result && result.length == 1){
                
                bcrypt.compare(password, result[0].password, (err, match) => {
                    if(match){

                        let img = null;
                        const imgLocalisation = path.join(__dirname, '../uploads/avatar/' + result[0].avatar);
                        if(fs.existsSync(imgLocalisation)){
                            const data = fs.readFileSync(imgLocalisation, { encoding: 'base64' });
                            img = `data:image/png;base64,${data}`;
                        }

                        // Créez un token avec les informations de l'utilisateur
                        const user = { 
                            id: result[0].id, 
                            email: result[0].email, 
                            username: result[0].username,
                            avatar: img
                        };
                        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '12h' }); 
                    
                        // Envoyez le token au client
                        res.json({ success: true, token: token });

                        console.log(`${new Date().toLocaleString()} - ${user.username}(${user.id}) s'est connecté`);
                    } else {
                        res.send({success: false, message: "Email ou mot de passe incorrect"});
                        console.log(`${new Date().toLocaleString()} - ${email} a essayé de se connecter`);
                    }
                });

            } else {
                res.send({success: false, message: "Email ou mot de passe incorrect"});
            }
        }
    );
}

module.exports = { login };