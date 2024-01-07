const express = require('express');
const router = express.Router();

router.post("/signin", require("./route/signin").signin);

router.post("/login", require("./route/login").login);

router.post("/conversations", require("./route/conversations").conversations);

router.post("/messages", require("./route/messages").messages);

router.post("/messages/send", require("./route/messages").add);

module.exports = router;
