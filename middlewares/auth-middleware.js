const jwt = require('jsonwebtoken');
const { Users } = require("../models");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다.",
        });
        return;
    }

    try {
        const { nickname } = jwt.verify(authToken, "tunamayo-secret-key");
        Users.findOne(nickname).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch(e) {
        res.status(401).json({ errorMessage: "로그인이 필요합니다." });
    }
};