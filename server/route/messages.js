const { db } = require('../db');

function messages(req, res){

    const { id_conversation } = req.body;

    db.query(
        "SELECT * FROM t_message WHERE id_conversation = ? ORDER BY send_time ASC;",
        [id_conversation],
        (err, result) => {
            if(result){
                console.log(`${new Date().toLocaleString()} - Recupération des messages de la conversation ${id_conversation}`);
                res.json({ success: true, messages: result });
            } else {
                res.json({ success: false, message: "Aucun message trouvé" });
            }
        }
    )
}

function add(req, res){

    const { id_conversation, id_user, message } = req.body;

    db.query(
        "INSERT INTO t_message (id_conversation, id_user, content, send_time) VALUES (?, ?, ?, ?);",
        [id_conversation, id_user, message, new Date()],
        (err, result) => {
            if(result){
                console.log(`${new Date().toLocaleString()} - Ajout d'un message dans la conversation ${id_conversation}`);
                res.json({ success: true, message: {
                    id: result.insertId,
                    id_conversation: id_conversation,
                    id_user: id_user,
                    content: message,
                    send_time: new Date()
                }});
            } else {
                res.json({ success: false, message: "Erreur lors de l'ajout du message" });
            }
        }
    )
}

module.exports = { messages, add };