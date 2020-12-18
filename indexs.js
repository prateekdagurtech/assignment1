
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
            const usersData = await userData.insertOne(user);
            profile.userId = usersData.insertedId;
            const profilesData = await userDetails.insertOne(profile)
            return 'User created succesully'

        }

    
        let users = [{
            "firstname": "vivek",
            "lastname": "dagur",
            "age": 25,
            "email": "vivekdagur8@gmail.com",
            "password": "react123",
            "dob": "222",
            "mobile": "1w1"
        },
        {
            "firstname": "prateek",
            "lastname": "dagur",
            "age": 23,
            "email": "prateekdagur8@gmail.com",
            "password": "node123",
            "dob": "222",
            "mobile": "1w1"
        },
        {
            "firstname": "ankur",
            "lastname": "paliwal",
            "age": 24,
            "email": "anku78@gmail.com",
            "password": "ank123",
            "dob": "222",
            "mobile": "1w1"


        },
        {
            "firstname": "divyanshu",
            "lastname": "sharma",
            "age": 26,
            "email": "dv3456@gmail.com",
            "password": "dvw123",
            "dob": "222",
            "mobile": "1w1"
        },

        {
            "firstname": "kapil",
            "lastname": "dagur",
            "age": 27,
            "email": "kapilch@gmail.com",
            "password": "node123",
            "dob": "222",
            "mobile": "1w1"
        }
    ]

        let finaldata = []
        for (let data of users) {
            let user = {
                firstname: data.firstname,
                lastname: data.lastname,
                age: data.age,
                email: data.email,
                password: data.password
            }
            let profile = {
                'dob': data.dob,
                'mobile': data.mobile
            }
            finaldata.push(create(user,profile))
        }
        await Promise.all(finaldata)
        
        const userDoc = await userData.find({}).toArray();
        const userDocs = await userDetails.find({}).toArray();
        var sum=0;
        for(var i=0;i<users.length; i++) {
            sum += users[i].age;
           average = sum/users.length;
        }
        averageAge = average
       console.log(averageAge)
        const result = await userData.deleteMany({age: { $gt: 25 }});
        
        await client.close();
        } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);


