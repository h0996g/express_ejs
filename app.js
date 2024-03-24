const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/products'); // User is logged in, redirect to products page
    } else {
        res.redirect('/users/login'); // User is not logged in, redirect to login page
    }
});
app.use('/users', userRoutes);
app.use('/products', productRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
