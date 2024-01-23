const { db } = require('../db');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

function updateCompte(req, res){
    
    const { id, username, email, password } = req.body;
    const file = req.file ? req.file : null;
    const fileName = file ? file.filename : null;

    if(password !== ""){
        bcrypt.hash(password, 10, (err, hash) => {
            db.query(
                "UPDATE t_user SET password = ?, update_time = NOW() WHERE id = ?",
                [hash, id],
                (err, result) => {
                    if(err){
                        console.log(err);
                        res.send({success: false, message: "Une erreur est survenue"});
                    }
                }
            );
        });
    }

    if(file !== null){
        db.query(
            "UPDATE t_user SET avatar = ?, update_time = NOW() WHERE id = ?",
            [fileName, id],
            (err, result) => {
                if(err){
                    console.log(err);
                    res.send({success: false, message: "Une erreur est survenue"});
                } 
            }
        )
    } else {
        db.query(
            "UPDATE t_user SET username = ?, update_time = NOW() WHERE id = ?",
            [username, id],
            (err, result) => {
                if(err){
                    console.log(err);
                    res.send({success: false, message: "Une erreur est survenue"});
                }
            }
        )
    }

    db.query(
        "SELECT * FROM t_user WHERE id = ?",
        [id],
        (err, result) => {
            if(err){
                console.log(err);
                res.send({success: false, message: "Une erreur est survenue"});
            } else {
                const { id, username, email, avatar } = result[0];
                let img = null;
                const imgLocalisation = path.join(__dirname, '../uploads/avatar/' + avatar);
                if(fs.existsSync(imgLocalisation)){
                    const data = fs.readFileSync(imgLocalisation, { encoding: 'base64' });
                    img = `data:image/png;base64,${data}`;
                }

                const user = { 
                    id: id, 
                    email: email, 
                    username: username,
                    avatar: img
                };
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '12h' }); 
                res.json({ success: true, token: token });
            }
        }
    );
}

module.exports = {
    updateCompte
}