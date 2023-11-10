const prisma = require("../DB/prisma");
const { emailQueue } = require("../Queues/index");
const { getUserSchema, addUserSchema } = require("../Validation/user");

exports.getUser = async (req, res, next) => {
    try {
        await getUserSchema.validateAsync(req.params);
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        res.send(user);
    } catch (error) {
        next(error);
    }
};

exports.addUser = async (req, res, next) => {
    try {
        await addUserSchema.validateAsync(req.body);
        const { email, age, name } = req.body;
        const user = await prisma.user.create({
            data: {
                email: email,
                age: age,
                name: name,
            },
        });

        // dummy job just to demonstarte bull working

        const job = await emailQueue.add({
            title: "Welcome to our platform",
        });

        await job.finished();
        // will send the response after job is completed
        // but not block the code as job is new process not blocking main thread
        // will accept new requests event though job code is syncronous
        // or you can omit this line if want to run job in background and send response immediately

        res.send("user created success");
    } catch (error) {
        next(error);
    }
};
