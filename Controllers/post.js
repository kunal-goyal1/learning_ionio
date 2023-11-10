const prisma = require("../DB/prisma.js");
const {
    addPostSchema,
    getPostSchema,
    getUserPostsSchema,
    likePostSchema,
} = require("../Validation/post.js");

exports.addPost = async (req, res, next) => {
    try {
        await addPostSchema.validateAsync(req.body);
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
        next(error);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        await getPostSchema.validateAsync(req.params);
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
        next(error);
    }
};

exports.getUserPosts = async (req, res, next) => {
    try {
        await getUserPostsSchema.validateAsync(req.params);
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
        next(error);
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
        next(error);
    }
};

exports.likePost = async (req, res, next) => {
    try {
        await likePostSchema.validateAsync(req.body);
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
        next(error);
    }
};
