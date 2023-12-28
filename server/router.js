const express = require('express');
const router = express.Router();

router.post("/signin", require("./route/signin").signin);

router.post("/login", require("./route/login").login);

// Exportez le routeur pour l'utiliser ailleurs
module.exports = router;
