const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes/index');

app.use(express.json());
app.use("/", router);

app.get('/', (req, res) => {
    res.send("메인 페이지입니다.");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});