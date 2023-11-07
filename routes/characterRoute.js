const express = require("express");

const router = express.Router();
const characterController = require('../controllers/characterController');

router.get("/universes/:id/characters", characterController.getAllCharacters);
router.post("/characters", characterController.createCharacter);
router.put("/character/:id/", characterController.editCharacter);
router.delete("/universes/:id/characters", characterController.deleteCharacter);

module.exports = router;