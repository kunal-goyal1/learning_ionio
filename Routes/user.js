const express = require("express");
const userController = require("../Controllers/user");

const router = express.Router();

router.get("/get/:id", userController.getUser);

router.post("/add", userController.addUser);

module.exports = router;
