const express = require("express");

const router = express.Router();
const messageController = require('../controllers/messageController');

router.get("/:id", messageController.getMessage);
router.post("/:id/add", messageController.sendMessage);


module.exports = router;