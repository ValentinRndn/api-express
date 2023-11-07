const express = require("express");

const router = express.Router();
const messageController = require('../controllers/messageController');

router.get("/:id/messages", messageController.getAllMessage);
router.post("/:id/messages", messageController.sendMessage);
router.put("/:id", messageController.regenerateMessage);


module.exports = router;