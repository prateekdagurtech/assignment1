const express = require('express')
const mongoose = require('mongoose')
const User = require('./user');
var url = "mongodb+srv://prateek:java1234@cluster0.vkgzh.mongodb.net/nodedb?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

var app = express()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const port = process.env.PORT || 3000;
app.use(express.json());



app.post('/user/register', async (req, res) => {

    try {
        

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        req.body.password = hash
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
