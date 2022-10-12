const express = require('express');
const router = express.Router();
const usersRouter = require("./users");
const postsRouter = require("./posts");

router.use("/", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;