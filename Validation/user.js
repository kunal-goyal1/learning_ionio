const joi = require("joi");

exports.getUserSchema = joi.object({
    id: joi.string().required(),
});

exports.addUserSchema = joi.object({
    email: joi.string().email().required(),
    age: joi.number().required(),
    name: joi.string().required(),
});
