const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const { Comments } = require('../models');

// 댓글 생성 API
router.post("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { userId, nickname } = res.locals.user;
    const { comment } = req.body;
    if(comment === "") {
        return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요."})
    }

    try {
        const CreatedComment = await Comments.create({ postId, userId, nickname, comment });
        res.status(200).json({ "message": "댓글을 작성하였습니다." });
    } catch (err) {
        res.status(400).json({ errorMessage: "댓글 생성에 실패했습니다." });
    }
});

// 댓글 목록 조회 API
router.get("/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        // const post = await Posts.findByPk(postId);
        const data = await Comments.findAll({
            attributes: {exclude: ['postId'],},
            where: { postId },
            order: [['createdAt', 'DESC']],
        })
        if (data.length) {
            res.json({ data });
        } else {
            return res.status(400).json({ errorMessage: "존재하지 않는 게시글의 댓글입니다." });
        }
    } catch (err) {
        res.json({ errorMessage: "댓글 목록 조회에 실패했습니다." });
    }
});

// 댓글 수정 API
router.patch('/:commentId', authMiddleware, async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    try {
        const currentComment = await Comments.findByPk(commentId);

        if (currentComment) {
            await Comments.update(
                { comment: comment },
                { where: { commentId } }
            );
            res.status(200).json({ "message": "댓글을 수정하였습니다." });
        } else {
            res.status(400).json({ errorMessage: "댓글이 존재하지 않습니다." })
        }
    } catch (err) {
        res.status(400).json({ errorMessage: "댓글 수정에 실패했습니다." });
    }
});

module.exports = router;