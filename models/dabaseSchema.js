'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({

    _id: mongoose.SchemaTypes.ObjectId,
    first_name: {
        
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        unique: true
    },
    date_of_birth: {
        type:Date,
        required: true
    },

});

let employeedCollection = mongoose.model('Employees', employeesSchema);

module.exports = employeedCollection;