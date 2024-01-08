const { db } = require('../db');

function adduser(req, res){

    const { id_user } = req.body;

    db.query(
        `SELECT DISTINCT u.id as id, u.username as username, u.email as email
        FROM t_user u
        LEFT JOIN (
            SELECT t_user.id AS user_id
            FROM t_user
            LEFT JOIN t_conversation ON t_user.id = t_conversation.id_user1 OR t_user.id = t_conversation.id_user2
            WHERE t_conversation.id_user1 = ? OR t_conversation.id_user2 = ?
        ) conversations ON u.id = conversations.user_id
        WHERE conversations.user_id IS NULL AND u.id <> ?;`,
        [id_user, id_user, id_user],
        (err, result) => {
            if(result){
                res.json({ success: true, users: result });
            } else {
                res.json({ success: false, message: "Aucun utilisateur trouvé" });
            }
        }
    )
}

module.exports = { adduser };