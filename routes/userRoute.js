const express = require("express");

const router = express.Router();
const userController = require('../controllers/userController');

router.post("/auth", userController.authentification);
router.post("/createUser", userController.createUser);
router.put("/updateUser/:id", userController.updateUser);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getAllUsers/", userController.getAllUsers);

module.exports = router;