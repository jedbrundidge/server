/**
 * Created by JedBr on 1/3/2018.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//create booking schema and model

var bookingSchema = new Schema({

    cabinNum: {
        type: Number
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },


    dateIn: {
        type: Date
    },

    dateOut: {
        type: Date
    },


});


var Cabins = mongoose.model('cabins', bookingSchema);
module.exports = Cabins;