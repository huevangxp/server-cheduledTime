const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,

    },
    password: {
        type: String,
        required: true,
    },
    scheduledTime: {
        type: Date,

    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
