const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
});

module.exports = mongoose.model("Users", usersSchema);