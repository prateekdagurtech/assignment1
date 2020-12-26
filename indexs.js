require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const auth = require('./auth')
const jwt = require('jsonwebtoken')
const Users = require('./user');
let url = process.env.URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

let app = express()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/user/register', async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        req.body.salt = salt
        const user = new Users(req.body);
        let data = await user.save();
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


app.post('/user/login', async (req, res) => {
    try {
        const user = await findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        req.body.userId = user._id
        res.send(req.body.userId, token)
    } catch (e) {
        res.status(400).send(e.message)
    }
});
findByCredentials = async (username, password) => {
    const user = await Users.findOne({ username })

    if (!user) {
        throw new Error("No such username")
    }

    isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("No any matches of password")
    }
    return user
}

generateAuthToken = async function () {
    const token = jwt.sign({ _id: req.body.userId.toString() }, 'mytoken')
    return token
}


app.get('/users/registered', async (req, res) => {
    const user = await Users.find({});

    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/users/get/', auth, async (req, res) => {
    res.send(req.user)


});

app.listen(port, () => console.log(`Express server currently running on port ${port}`));

