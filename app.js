const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const apiUrl = './api/router/';

app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error
    })
});

// Account
app.use(`/account`, require(`${apiUrl}account`));
// Trasport
app.use(`/transport`, require(`${apiUrl}transport`));
// app.use(`/bill`, require(`${apiUrl}/bill`));
// Booking
app.use(`/booking`, require(`${apiUrl}booking`));
// Account
app.use(`/person`, require(`${apiUrl}/person`));
// // Account
// app.use(`/feedback`, require(`${apiUrl}/feedback`));
// // Account
// app.use(`/image`, require(`${apiUrl}/image`));
// // Account
// app.use(`/import`, require(`${apiUrl}/import`));
// // Account
// app.use(`/product`, require(`${apiUrl}/product`));

module.exports = app;