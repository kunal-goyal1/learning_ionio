const joi = require("joi");

const errorHandler = (err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.status(422).send(err);
    }
    console.log(err);
    return res.status(500).send("something went wrong");
};

module.exports = errorHandler;
