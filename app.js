// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./database'); // This will connect to MongoDB
const productRoutes = require('./routes/products');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', productRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
