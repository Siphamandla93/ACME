'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:Number,
        required: true,
        unique: true
    },

});

let passwordCollection = mongoose.model('User passwords', passSchema);

module.exports = passwordCollection;