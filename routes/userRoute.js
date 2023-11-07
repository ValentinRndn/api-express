const express = require("express");

const router = express.Router();
const userController = require('../controllers/userController');

router.post("/createUser", userController.createUser);
router.post("/auth", userController.authentification);
router.put("/updateUser/:id", userController.updateUser);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getAllUsers/:id", userController.getAllUsers);

module.exports = router;