'use strict'

const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();



const bodyParse = require('body-parser');
const passwordCollection = require('../models/dabaseSchema');
const { json } = require('body-parser');


router.get('/', (req,res) => res.render('landing', {}));


module.exports = router;