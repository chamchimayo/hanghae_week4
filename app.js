const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes/index');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/hanghae_week4');

app.use(express.json());
app.use("/", router);

app.get('/', (req, res) => {
    res.send("메인 페이지입니다.");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});