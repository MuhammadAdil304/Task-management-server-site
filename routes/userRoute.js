const UserController = require('../controllers/userController')
const router = require('express').Router()

router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)

module.exports = router