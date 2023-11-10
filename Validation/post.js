const joi = require("joi");

exports.addPostSchema = joi.object({
    title: joi.string().required(),
    authorId: joi.string().required(),
});

exports.getPostSchema = joi.object({
    id: joi.string().required(),
});

exports.getUserPostsSchema = joi.object({
    authorId: joi.string().required(),
});

exports.likePostSchema = joi.object({
    postId: joi.string().required(),
    userId: joi.string().required(),
});
