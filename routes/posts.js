const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Posts } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');

// 게시글 작성 API
router.post("/", authMiddleware, async (req, res) => {
    const { userId, nickname } = res.locals.user;
    const { title, content } = req.body;
    // try {
        const createdPosts = await Posts.create({ userId, nickname, title, content });

        res.json({ "message": "게시글 작성에 성공하였습니다." })

    // } catch (err) {
    //     res.status(400).json({ errorMessage: "게시글 작성에 실패했습니다." });
    // }
});

// 게시글 목록 조회 API
router.get("/", async (req, res) => {
    const posts = await Posts.find().sort({ createdAt: -1 });
    console.log(posts);
    res.send("ok");
    // try {
    //     console.log("here comes");

    //     const data = [];
    //     for(let i = 0; i < posts.length; i++) {
    //         data.push({
    //             postId: posts[i].postId.toString(),
    //             userId: posts[i].userId,
    //             nickname: posts[i].nickname,
    //             title: posts[i].title,
    //             createdAt: posts[i].createdAt,
    //             updatedAt: posts[i].updatedAt
    //         });
    //     };
    //     res.json({ data });
    // } catch (err) {
    //     res.status(400).json({ errorMessage: "게시글 목록 조회에 실패했습니다." });
    // }
});

module.exports = router;