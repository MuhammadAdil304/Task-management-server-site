const Response = require('../heplers/helper')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserController = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const obj = { username, email, password }
            const errArray = []
            if (!obj.username || !obj.email || !obj.password) {
                errArray.push('All fields are required')
                return Response.sendError(res, 400, "All fields are required", errArray)
            }
            const existingUsername = await User.findOne({ username: obj.username })
            if (existingUsername) {
                return Response.sendError(res, 400, "Username already in use", null)
            }
            const existingEmail = await User.findOne({ email: obj.email })
            if (existingEmail) {
                return Response.sendError(res, 400, "Email already in use", null)
            }
            const hashedPassword = await bcryptjs.hash(password, 10)
            obj.password = hashedPassword
            const newUser = new User(obj)
            await newUser.save()
            return Response.sendMessage(res, 200, "User created successfully", newUser)
        }
        catch (error) {
            console.log(error.message)
            return Response.sendError(res, 500, "Internal Server Error", error.message)
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body
            const obj = { email, password }
            const errArr = []
            if (!obj.email || !obj.password) {
                errArr.push('All fields are required')
                return Response.sendError(res, 400, "All fields are required", errArr)
            }
            const existingUser = await User.findOne({ email: obj.email })
            if (existingUser) {
                const correctPassword = await bcryptjs.compare(obj.password, existingUser.password)
                if (correctPassword) {
                    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
                    return Response.sendMessage(res, 200, "User logged in successfully", { user: existingUser, token: token })
                }
            }
            else {
                Response.sendError(res, 400, "Invalid credentails", null)
            }
        } catch (error) {
            console.log(error.message)
            return Response.sendError(res, 500, "Internal Server Error", error.message)
        }
    }
}

module.exports = UserController