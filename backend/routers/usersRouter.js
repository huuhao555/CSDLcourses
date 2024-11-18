const express = require("express");
const router = express.Router();
const UserController = require("../controllers/usersController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);
router.get("/", UserController.getAllUsers);


module.exports = router;
