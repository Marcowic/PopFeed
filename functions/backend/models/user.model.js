const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
        },
    surname: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
        },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    favourites_list: {
        type: Array
    },
    following_list: {
        type: Array
    },
    song_list: {
        type: Array
    }
    },
    {
        timestamps: true
    });

const User = mongoose.model('Users', userSchema);

module.exports = User;