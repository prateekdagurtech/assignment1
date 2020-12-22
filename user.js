const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose;

const blogSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        bcrypt: true,
    },
    confirmpassword: {
        type: String,
        required: true,
        bycrypt: true,
    }
})
const Usersdata = mongoose.model('users', blogSchema);
console.log(Usersdata);

module.exports = Usersdata