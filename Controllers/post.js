const prisma = require("../DB/prisma.js");

exports.addPost = async (req, res, next) => {
    try {
        const { title, authorId } = req.body;
        const post = await prisma.post.create({
            data: {
                title: title,
                author: {
                    connect: {
                        id: authorId,
                    },
                },
            },
        });
        res.send("post created success");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                author: true,
                _count: {
                    select: { likedBy: true },
                },
            },
        });
        res.send(post);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.getUserPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    id: req.params.authorId,
                },
            },
            include: {
                _count: {
                    select: { likedBy: true },
                },
            },
        });
        res.send(posts);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const { count, page } = req.query;
        const take = count;
        skip = (page - 1) * count;
        const posts = await prisma.findMany({
            where: {},
            include: {
                _count: {
                    select: { likedBy: true },
                },
            },
            take: count ? count : 0,
            skip: skip ? skip : 0,
        });
        res.send(posts);
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const { postId, userId } = req.body;
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likedBy: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        console.log(post);
        res.send("post liked success");
    } catch (error) {
        return res.status(500).send(error);
    }
};
