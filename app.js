const express = require('express');
const app = express();
const router = require('./routes/index');
const dotenv = require("dotenv");
dotenv.config();

// const { PORT }  = process.env;
// const port = PORT || 3000
app.set('port', process.env.PORT || 3000)

app.use(express.json());
app.use("/", router);

app.get('/', (req, res) => {
    res.send("메인 페이지입니다.");
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "번 포트로 서버가 연결되었습니다.");
});