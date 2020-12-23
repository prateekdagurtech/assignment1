require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const Users = require('./user');
//const Userlogin = require('./user');
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
        const user = new Users(req.body);
        let data = await user.save();
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.get('/users/register', async (req, res) => {
    const user = await Users.find({});

    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(port, () => console.log(`Express server currently running on port ${port}`));
