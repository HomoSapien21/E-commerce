const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
require('dotenv').config();

// Configure Express to use qs for query parsing (supports nested objects)
app.set('query parser', 'extended');


const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Running!");
});

app.get('/', (req, res) => {
    res.json({ msg: "This is test" });
});

// MONGO DB CONNECTION
const URI = process.env.MONGODB_URL;

mongoose.connect(URI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.');
});

// Routes
app.use('/api', require('./routes/productRouter'));
app.use('/user', require('./routes/userRouter'));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
