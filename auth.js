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

module.exports.auth1 = async (req, res, next) => {
    try {
        const token = req.headers.token
        const deletedUser = await Users.findOneAndDelete({ "_id": token })
        if (!deletedUser) {
            throw new Error("did not delete user")
        }
        req.user = deletedUser
        next()

    } catch (e) {
        res.status(401).send(e.message)
    }

}

