const jwt = require('jsonwebtoken');
const { Users } = require("../models");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인이 필요한 기능입니다.",
        });
        return;
    }

    try {
        const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
            
        Users.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch(e) {
        res.status(401).json({ errorMessage: "로그인이 필요합니다." });
    }
};