const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/auth-middleware');

const { Posts } = require('../models');
const { Likes } = require('../models')

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
    try {
        const data = await Posts.findAll({
            attributes: {exclude: ['content'],},
            order: [['createdAt', 'DESC']],
        });
        console.log(data);
        res.json({ data });
    } catch (err) {
        res.status(400).json({ errorMessage: "게시글 목록 조회에 실패했습니다." });
    }
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
router.patch("/:postId", authMiddleware, async (req, res) => {

    const { postId } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Posts.findByPk(postId);

        if(post) {
            await Posts.update(
                { title, content },
                {where: { postId }},
            );
            res.status(200).json({ "message": "게시글을 수정하였습니다." });
        } else {
            res.status(400).json({ errorMessage: "게시글이 존재하지 않습니다." });
        }
    } catch {
        return res.status(400).json({ errorMessage: "게시글 수정에 실패했습니다" });
    }
});

// 게시글 삭제 API
router.delete("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;

    const post = await Posts.findByPk(postId);
    try {
        if(post) {
            await Posts.destroy({ where: { postId } });
            res.status(200).json({ "message": "게시글을 삭제하였습니다." });
        } else {
            res.status(400).json({ errorMessage: "게시글 존재하지 않습니다." });
        }
    } catch (err) {
        res.json({ errorMessage: "게시글 삭제에 실패했습니다."});
    }
});

// 게시글 좋아요 API
router.put('/:postId/like', authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    try {
        const currentLike = await Likes.findOne({where: [{postId}, {userId}]})
    
        if(!currentLike) {
            await Likes.create({postId, userId});
            res.status(200).json({ "message": "게시글의 좋아요를 등록하였습니다." });
        } else {
            await Likes.destroy({where: [{postId}, {userId}]});
            res.status(200).json({ "message": "게시글의 좋아요를 취소하였습니다." });
        }
    } catch (err) {
        res.status(400).json({ errorMessage: "좋아요 실패!" });
    }
});

module.exports = router;