const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Posts } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');

// 게시글 작성 API
router.post("/", authMiddleware, async (req, res) => {
    const { userId, nickname } = res.locals.user;
    const { title, content } = req.body;
    try {
        const createdPosts = await Posts.create({ userId, nickname, title, content });

        res.json({ "message": "게시글 작성에 성공하였습니다." })

    } catch (err) {
        res.status(400).json({ errorMessage: "게시글 작성에 실패했습니다." });
    }
});

// 게시글 목록 조회 API
router.get("/", async (req, res) => {
    // try {
        const data = await Posts.findAll({
            attributes: {exclude: ['content'],},
            order: [['createdAt', 'DESC']],
        });
        console.log(data);
        res.json({ data });
    // } catch (err) {
    //     res.status(400).json({ errorMessage: "게시글 목록 조회에 실패했습니다." });
    // }
});

// 게시글 상세 조회 API
router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    try {  
        const data = await Posts.findOne({where: { postId }});
        
        if (!data) {
            return res.status(400).json({ errorMessage: "게시글이 존재하지 않습니다." });
        }
        res.json({ data });
    } catch (err) {
        res.status(400).json({ errorMessage: "게시글 조회에 실패했습니다." });
    }
});

// 게시글 수정 API
router.patch("/:postId", async (req, res) => {
    // {  "title": "안녕하새요 수정된 게시글 입니다.",  "content": "안녕하세요 content 입니다."}
    const { postId } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Posts.findByPk(postId);

        if(post) {
            await Posts.update(
                { title, content },
                {where: { postId }},
            );
            res.json({ "message": "게시글을 수정하였습니다." });
        } else {
            res.json({ errorMessage: "게시글이 존재하지 않습니다." });
        }
    } catch {
        return res.status(400).json({ errorMessage: "게시글 수정에 실패했습니다" });
    }
});

module.exports = router;