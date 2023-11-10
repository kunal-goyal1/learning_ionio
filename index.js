const express = require("express");
const dotenv = require("dotenv");
const redis = require("./DB/redis.js");
const userRoutes = require("./Routes/user.js");
const postRoutes = require("./Routes/post.js");
const errorHandler = require("./Middlewares/errorMiddleware.js");

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    await redis.connect();
    console.log("server started");
});

process.on("SIGINT", async () => {
    console.log("server closed");
    await redis.disconnect();
});
