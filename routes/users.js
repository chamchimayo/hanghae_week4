const express= require('express');
const router = express.Router();
const Users = require('../models/users');

// 회원 가입 API
router.post("/signup", async (req, res) =>{
    const { nickname, password, confirm } = req.body;
    
    if(password != confirm) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    }

    try {
        const existsUser = await Users.findOne({ nickname });
        
        if(existsUser) {
            res.status(400).json({ errorMessage: "중복된 닉네임입니다." });
            return;
        }

        await Users.create({ nickname, password });
        res.status(201).send({});
    } catch(e) {
        res.status(400).json({ errorMessage: "회원 가입에 실패했습니다." });
    }
});

router.post("/login", async (req, res) =>{
    const { nickname, password } = req.body;
    try {
        const user = await Users.findOne({ nickname });

        if(!user || password !== user.password) {
            res.status(400).json({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
            return;
        }
        res.send("로그인 OK!");
    } catch(e) {
        res.status(400).json({ errorMessage: "로그인에 실패했습니다." });
    }
});

module.exports = router;