const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({
            username,
            password, // Password hashing is handled by the model's pre-save middleware
            role
        });
        await user.save();
        res.status(201).send({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.login = async (req, res) => {
    // Example login logic
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user._id, username: user.username };
            req.session.isAdmin = user.role === 'admin'; // Set isAdmin based on user role
            req.session.isLoggedIn = true;
            return res.redirect('/products');
        } else {
            // Handle login failure
        }
    } catch (error) {
        // Handle error
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            // Handle error case
            console.error("Error during session destruction:", err);
            res.status(500).send("Error logging out");
        } else {
            // Successful logout
            res.redirect('/users/login'); // Or to wherever you wish to redirect after logout
        }
    });
};