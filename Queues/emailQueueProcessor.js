// blocking code synchrunous will wait for given ms
// used to demonstre creating new process using bull without blocking main process
function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

const processor = async (job, done) => {
    console.log("job data", job.data);

    wait(5000); // job will take 5 seconds to complete

    console.log("job completed");

    done();
};

module.exports = processor;
