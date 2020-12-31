const Users = require('./user');
module.exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.token
        const user = await Users.findOne({ "_id": token })
        if (!user) {
            throw new Error("no user")
        }
        req.user = user
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }

}


