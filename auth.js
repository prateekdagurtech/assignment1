
// const User = require('./indexs')
// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('authorization').replace('Bearer', '')
//         const decoded = jwt.verify(token, 'mytoken')
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

//         if (!user) {
//             throw new Error()
//         }
//         req.user = user
//         next()

//     } catch (e) {
//         res.status(401).send({ error: 'please authenticate' })
//     }

// }

// module.export = auth