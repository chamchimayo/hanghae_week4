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

module.exports = router;