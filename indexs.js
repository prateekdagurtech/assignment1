
require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const userAuthentication = require('./auth')
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
        req.body.userId = user._id
        res.json({
            token: req.body.userId
        })

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

app.get('/users/get/', userAuthentication.auth, async (req, res) => {
    res.send(req.user);
});

app.put('/user/delete', userAuthentication.auth, async (req, res) => {
    try {

        const token = req.headers.token
        const deleteUser = await Users.findOneAndDelete({ "_id": token })
        res.json({ message: 'successully deleted' })
    } catch (e) {
        res.status(401).send(e.message)
    }
});
app.get('/user/get', async function (req, res) {

    const per_page = parseInt(req.query.per_page) || 3
    const page_no = parseInt(req.query.page_no) || 1
    var pagination = {
        limit: per_page,
        skip: per_page * (page_no - 1)
    }
    users = await Users.find().limit(pagination.limit).skip(pagination.skip)
    res.send(users)
});


app.listen(port, () => console.log(`Express server currently running on port ${port}`));
