const express = require('express');
const router = express.Router();
const usersRouter = require("./users");
const postsRouter = require("./posts");
const commentsRouter = require("./comments");

router.use("/", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

module.exports = router;