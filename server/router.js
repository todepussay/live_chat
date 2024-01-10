const express = require('express');
const router = express.Router();

router.post("/signin", require("./route/signin").signin);

router.post("/login", require("./route/login").login);

router.post("/conversations", require("./route/conversations").conversations);

router.post("/conversations/delete", require("./route/conversations").conversationDelete);

router.post("/messages", require("./route/messages").messages);

router.post("/messages/send", require("./route/messages").add);

router.post("/adduser", require("./route/adduser").adduser);

router.post("/adduser/add", require("./route/adduser").add);

module.exports = router;
