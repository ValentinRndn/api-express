const express = require("express");

const router = express.Router();
const characterController = require('../controllers/characterController');

router.get("/:id", characterController.getAllCharacters);
router.post("/createCharacter", characterController.createCharacter);
router.put("/update/:id", characterController.updateCharacter);
router.delete("/delete/:id", characterController.deleteCharacter);

module.exports = router;