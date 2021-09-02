'use strict'

const express = require('express');
const mongoose = require('mongoose');
const connectPoint = require('./models/atlassconnection');
const employee_collect = require('./models/dabaseSchema');
const flash = require('express-flash');


const app = express();

const axphbs = require('express-handlebars');
const { countDocuments } = require('./models/dabaseSchema');
//const employeedCollection = require('./models/dabaseSchema');

app.engine('handlebars',axphbs({
    defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.json({extended:false}));


const PORT = process.env.PORT || 3000;

connectPoint()


app.use('/', require('./logic/routing'));
app.use(express.static('views/images'));

app.get('/landing', (req,res) => {

    res.render('landing')
})

app.get('/employ', (req,res) => {

    res.render('employ')
})


app.get('/employees', (req,res) => {

    employee_collect.find()
    .exec()
    .then( results => {
        console.log(results);
        res.json(results)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

app.delete('/delete/:id', (req,res,next) =>{

    employee_collect.deleteOne({ _id: req.params.id })
    .exec()
    .then(result =>{

        res.status(200).json({message: `Member deleted`, result});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})


////////////// End of Delete router

app.patch('/edit/:personId', (req,res, next) =>{
    
    const id = req.params.personId;

    const keepUpdates = {};

    for(const infor of req.body){
        keepUpdates[infor.propName] = infor.value;
    }
    employee_collect.update({_id: id}, {$set: keepUpdates})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message:  `Member updated`, result})
    })
    .catch(err => {
        res.status(500).json({
            
            error: err
        })
    })
})


//// REDIRECT TO ENTER USERS //////


///// POST A USER ROUT
app.post('/employer', (req,res) => {

    const employee_db = new employee_collect({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth
    })

    if( !employee_db.first_name || !employee_db.last_name || !employee_db.date_of_birth){
        req.flash('infor', 'Please fill in all fields')
        res.redirect('/')
    }

    employee_db.save()
    .then( result => {
        res.status(200).redirect('login')
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})



app.listen(PORT, console.log(`App is running on port, ${PORT}`));

