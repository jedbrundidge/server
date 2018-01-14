/**
 * Created by JedBr on 1/2/2018.
 */
var express = require('express');
var router = express.Router();
var Booking = require('../models/bookingSchema');


//get from the database
router.get('/booking', function (req, res) {

});

//update dates
router.post('/booking', function (req, res) {
    Booking.create(req.body).then(function (booking) {
        res.send(booking);
    });
});

//delete dates
router.delete('/', function (req, res) {

});

module.exports = router;
