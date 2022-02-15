const express = require('express');
const app = express();
const path = require('path');
const public_file = path.join(__dirname, 'public/');
const shortener_routes = require("./routes/shortener.js");
const redirect_routes = require("./routes/redirect.js");


app.use(express.json());

app.use('/', (req, res, next) => {
    express.static(public_file)(req, res, next);
});

app.use('/api/shortener', shortener_routes);

app.use('/:hash', redirect_routes)

module.exports = app;