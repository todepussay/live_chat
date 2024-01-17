const { db } = require('../db');

function getAllRelation(req, res){
    
    const { id } = req.params;
    
    db.query(
        `SELECT * FROM l_relation 
        WHERE id_user1 = ? OR id_user2 = ?
        ORDER BY id DESC`,
        [id, id],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, data: result});
            }
        }
    )
}

function getAllFriends(req, res){

    const { id } = req.body;

    db.query(
        `
        SELECT
            u.id AS id,
            u.username AS username,
            u.avatar AS avatar
        FROM
            t_user u
        JOIN
            l_relation r ON (u.id = r.id_user1 OR u.id = r.id_user2)
        WHERE
            (r.id_user1 = ? OR r.id_user2 = ?)
            AND r.status = 1
            AND u.id != ?
        ORDER BY
            u.username ASC
        `,
        [id, id, id],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, friends: result});
            }
        }
    )
}

function getUsers(req, res){

    const { id } = req.body;

    db.query(
        `
        SELECT DISTINCT
            u.id AS id,
            u.username AS username,
            u.email AS email,
            u.avatar AS avatar
        FROM t_user u
        LEFT JOIN l_relation r1 ON u.id = r1.id_user1
        LEFT JOIN l_relation r2 ON u.id = r2.id_user2
        WHERE r1.id_user2 IS NULL AND r2.id_user1 IS NULL AND u.id != ?;
        `,
        [id],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, users: result});
            }
        }
    )
}

function addFriend(req, res){

    const { id_user_ask, id_user_answer } = req.body;

    db.query(
        `INSERT INTO l_relation (id_user1, id_user2, status, create_time, update_time) VALUES (?, ?, ?, NOW(), NOW())`,
        [id_user_ask, id_user_answer, 0],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, data: result});
            }
        }
    )
}

function acceptFriend(req, res){

    const { id_user_ask, id_user_answer } = req.body;

    db.query(
        `UPDATE l_relation SET status = 1, update_time = NOW() WHERE id_user1 = ? AND id_user2 = ?`,
        [id_user_ask, id_user_answer],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, data: result});
            }
        }
    )
}

function denyFriend(req, res){

    const { id_user_ask, id_user_answer } = req.body;

    db.query(
        `DELETE FROM l_relation WHERE id_user1 = ? AND id_user2 = ?`,
        [id_user_ask, id_user_answer],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, data: result});
            }
        }
    )
}

function deleteFriend(req, res){

    const { id_user_ask, id_user_answer } = req.body;

    db.query(
        `DELETE FROM l_relation WHERE id_user1 = ? AND id_user2 = ?`,
        [id_user_ask, id_user_answer],
        (err, result) => {
            if(err){
                res.send({success: false, message: err});
            } else {
                res.send({success: true, data: result});
            }
        }
    )
}

module.exports = { 
    getAllRelation, 
    getAllFriends,
    getUsers,
    addFriend, 
    acceptFriend, 
    denyFriend, 
    deleteFriend
};