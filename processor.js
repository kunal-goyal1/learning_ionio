function pause(milliseconds) {
    var dt = new Date();
    while (new Date() - dt <= milliseconds) {
        /* Do nothing */
    }
}

const process = (job, done) => {
    pause(5000);
    console.log("job done");
    done();
};

module.exports = process;
