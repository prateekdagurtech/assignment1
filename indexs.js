//const express = require('express')
//const app = express()

//var ObjectId = require('mongodb').ObjectId;
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlendcoded({extended: false})) 
// var jsonParser = bodyParser.json()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://prateek:java1234@cluster0.vkgzh.mongodb.net/nodedb?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "nodedb";






async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const userData = db.collection("users");
        const userDetails = db.collection("usersProfile");
        async function create(user,profile){
            const u = await userData.insertOne(user);
            profile.userId = u.insertedId;
            const p = await userDetails.insertOne(profile)
            return 'User created succesully'
        }
        let users = [{
            "firstname": "vivek",
            "lastname": "dagur",
            "email": "vivekdagur8@gmail.com",
            "password": "react123",
            "dob": "222",
            "mobile": "1w1"
        },
        {
            "firstname": "prateek",
            "lastname": "dagur",
            "email": "prateekdagur8@gmail.com",
            "password": "node123",
            "dob": "222",
            "mobile": "1w1"
        },
        {
            "firstname": "ankur",
            "lastname": "paliwal",
            "email": "anku78@gmail.com",
            "password": "ank123",
            "dob": "222",
            "mobile": "1w1"


        },
        {
            "firstname": "divyanshu",
            "lastname": "sharma",
            "email": "dv3456@gmail.com",
            "password": "dvw123",
            "dob": "222",
            "mobile": "1w1"
        },

        {
            "firstname": "kapil",
            "lastname": "dagur",
            "email": "kapilch@gmail.com",
            "password": "node123",
            "dob": "222",
            "mobile": "1w1"
        }]

        let req = []
        for (let data of users) {
            let user = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password
            }
            let profile = {
                'dob': data.dob,
                'mobile': data.mobile
            }
            req.push(create(user,profile))
        }
        await Promise.all(req)
        
        const userDoc = await userData.find({}).toArray();
        const userDocs = await userDetails.find({}).toArray();
        console.log(userDoc);
        console.log(userDocs);
        await client.close();
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);


// MongoClient.connect(url, function(err, db) {
//  if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });





// .applisten(port, () => {

//     console.log('server is listening at atlas')
//})