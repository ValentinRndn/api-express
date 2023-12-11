const express = require("express");

const router = express.Router();
const universController = require('../controllers/universController');

router.post("/createUnivers", universController.createNewUnivers);
router.get("/", universController.getAllUniverse);
router.get("/:id", universController.getAnUnivers);
router.put("/update/:id", universController.editAnUnivers);
router.delete("/delete/:id", universController.deleteAnUnivers);

module.exports = router;