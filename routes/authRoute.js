const jwt = require("jsonwebtoken")
const Response = require("../heplers/helper")

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return Response.sendError(res, 401, 'Access Denied. No token provided', null)
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return Response.sendError(res, 403, 'Token is not valid', null)
            }
            req.user = user
            next()
        })
    }
    catch (error) {
        return Response.sendError(res, 500, 'Some error occured', error.message)
    }
}

module.exports = {authenticateToken}