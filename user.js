const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const usersSchema = new Schema({
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

    salt: {
        type: String,
        required: true,
        bcrypt: true,
    }
})

usersSchema.statics.findByCredentials = async (username, password) => {
    const user = await Usersdata.findOne({ username })

    if (!user) {
        throw new Error("No such email")
    }

    isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("No any matches")
    }

    return user
}

const Usersdata = mongoose.model('users', usersSchema);

module.exports = Usersdata
