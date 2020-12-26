const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')

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

// usersSchema.methods.getAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({ _id: user._id.toString() }, 'mytoken')

//     user.tokens = user.tokens.concat({ token })
//     await user.save()
// }

// usersSchema.statics.findByCredentials = async (username, password) => {
//     const user = await Usersdata.findOne({ username })

//     if (!user) {
//         throw new Error("No such username")
//     }

//     isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//         throw new Error("No any matches of password")
//     }

//     return user
// }

const Usersdata = mongoose.model('users', usersSchema);

module.exports = Usersdata
