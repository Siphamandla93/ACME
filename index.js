'use strict'

const express = require('express');
const mongoose = require('mongoose');
const connectPoint = require('./models/atlassconnection');


const app = express();

const axphbs = require('express-handlebars');

app.engine('handlebars',axphbs({
    defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.json({extended:false}));


const PORT = process.env.PORT || 3000;

connectPoint()


app.use('/', require('./logic/routing'));
app.use('/api/logIn', require('./logic/routing'));
app.use('/api/login', require('./logic/routing'));




app.listen(PORT, console.log(`App is running on port, ${PORT}`));

