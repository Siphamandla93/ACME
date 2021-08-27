'use strict'

const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();



const bodyParse = require('body-parser');
const passwordCollection = require('../models/passwordSchema');
const { json } = require('body-parser');


router.get('/', (req,res) => res.render('home', {}));



router.get('/api/login', (req,res) => {

    res.render('index')

})


router.post('/', (req,res) => {

    const password = new passwordCollection({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    password.save()
    .then( result => {
        res.status(200).redirect('index')
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })


})

module.exports = router;