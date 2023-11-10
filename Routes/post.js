const express = require("express");
const postController = require("../Controllers/post");

const router = express.Router();

router.post("/add", postController.addPost);

router.get("/get/:id", postController.getPost);

router.get("/get/all", postController.getAll);

router.post("/like", postController.likePost);

router.get("/userPosts/:authorId", postController.getUserPosts);

module.exports = router;
