const express = require("express");

const router = express.Router();
const universController = require('../controllers/universController');

router.get("/", universController.getAllUniverse);
router.get("/:id", universController.getAnUnivers);
router.post("/", universController.createNewUnivers);
router.put("/:id/characters", universController.editAnUnivers);
router.delete("/:id/characters", universController.deleteAnUnivers);

module.exports = router;