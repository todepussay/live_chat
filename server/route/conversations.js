const { db } = require('../db');

function conversations(req, res){

    const { id_user } = req.body;

    db.query(
        `SELECT 
            c.id AS conversation_id, 
            u.id as other_user_id, 
            u.username AS other_user_name, 
            m.content AS last_message_content, 
            m.id_user AS send_message_user, 
            m.send_time AS last_update,
            u.avatar as avatar
        FROM t_conversation c 
        JOIN t_user u ON (c.id_user1 = u.id OR c.id_user2 = u.id) AND u.id != ?
        LEFT JOIN t_message m ON c.id = m.id_conversation AND m.id = (SELECT MAX(id) FROM t_message WHERE id_conversation = c.id)
        WHERE c.id_user1 = ? OR c.id_user2 = ?
        ORDER BY m.send_time DESC;`,
        [id_user, id_user, id_user],
        (err, result) => {
            if(result){
                res.json({ success: true, conversations: result });
            } else {
                res.json({ success: false, message: "Aucune conversation trouvée" });
            }
        }
    );
}

function conversationDelete(req, res){

    const { id_conversation } = req.body;

    db.query(
        `DELETE FROM t_conversation WHERE id = ?`,
        [id_conversation],
        (err, result) => {
            if(result){
                res.json({ success: true });
            } else {
                res.json({ success: false, message: "Une erreur est survenue" });
            }
        }
    )

}

module.exports = { conversations, conversationDelete };