
const {Router} = require('express');
const router = Router();

const User = require('../models/user');
const userController = require('../controllers/userController');

router.get('/', userController.getSignUp);
router.post ('/signup', userController.createUser);

router.get('/login', userController.getLogIn);

router.post('/login', userController.postLogIn);

router.get('/profile', userController.getProfile);

module.exports = router;