const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './uploads/avatar');
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post("/signin", require("./route/signin").signin);

router.post("/login", require("./route/login").login);

router.post("/user/update/compte", upload.single('file'), require("./route/user").updateCompte);

router.post("/relation/", require("./route/relation").getAllRelation);

router.post("/relation/friends", require("./route/relation").getAllFriends);

router.post("/relation/friends/ask", require("./route/relation").getAllFriendsAndAsk);

router.post("/relation/users", require("./route/relation").getUsers);

router.post("/relation/add", require("./route/relation").addFriend);

router.post("/relation/accept", require("./route/relation").acceptFriend);

router.post("/relation/deny", require("./route/relation").denyFriend);

router.post("/relation/delete", require("./route/relation").deleteFriend);

module.exports = router;
