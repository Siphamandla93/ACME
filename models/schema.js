const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    commen:{
        type:  String,
        required: true
    },
    decription: {
        type: String,
        required: true
    },
    timestamp: true
});


const menue = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }
});

let Dishes = mongoose.model('Dish', dishSchema);
//let menuelist = mongoose.model('Menue', menue)

module.exports = Dishes;
//module.exports = menuelist;