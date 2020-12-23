const express = require('express')
const mongoose = require('mongoose')
const User = require('./user');
require("dotenv").config()
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
        const user = new User(req.body);
        let data = await user.save();
        res.send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.get('/users/register', async (req, res) => {
    const user = await User.find({});

    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(port, () => console.log(`Express server currently running on port ${port}`));
