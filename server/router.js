const express = require('express');
const router = express.Router();

router.post("/signin", require("./route/signin").signin);

router.post("/login", require("./route/login").login);

router.post("/user/update/compte", require("./route/user").updateCompte);

router.post("/relation/", require("./route/relation").getAllRelation);

router.post("/relation/friends", require("./route/relation").getAllFriends);

router.post("/relation/friends/ask", require("./route/relation").getAllFriendsAndAsk);

router.post("/relation/users", require("./route/relation").getUsers);

router.post("/relation/add", require("./route/relation").addFriend);

router.post("/relation/accept", require("./route/relation").acceptFriend);

router.post("/relation/deny", require("./route/relation").denyFriend);

router.post("/relation/delete", require("./route/relation").deleteFriend);

module.exports = router;
