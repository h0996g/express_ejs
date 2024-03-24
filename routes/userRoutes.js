const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); // Fix: Correct the casing of the filename

// router.post('/register', userController.register);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', userController.register);

router.get('/login', (req, res) => res.render('login'));
// Assuming a login method in your UserController that handles authentication
router.post('/login', userController.login);
// Assuming this is placed in your routes file, like userRoutes.js
router.get('/logout', userController.logout);


module.exports = router;
