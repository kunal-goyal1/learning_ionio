const Queue = require("bull");
const path = require("path");

const emailQueue = new Queue("emailQueue");

emailQueue.process(path.join(__dirname, "./emailQueueProcessor.js"));

module.exports = {
    emailQueue,
};
