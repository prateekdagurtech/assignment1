require("dotenv").config()
const express = require('express')
ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')
const Users = require('./user');
const jwt = require('jsonwebtoken')
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
        res.send(req.body.userId)
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


app.get('/users/registered', async (req, res) => {
    const user = await Users.find({});

    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/users/get/', async (req, res) => {
    const user = await Users.find({});

    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// const authFunction = async () => {
//     const token = jwt
// }
app.listen(port, () => console.log(`Express server currently running on port ${port}`));
