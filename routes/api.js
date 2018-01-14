/**
 * Created by JedBr on 1/2/2018.
 */
var express = require('express');
var router = express.Router();
var Booking = require('../models/bookingSchema');



//get from the database
router.get('/booking', function (req, res, next) {
    Booking.find({}).then(function (booking) {
        res.send(booking);
    })
});

//route handler for booking cabins
router.post('/booking', function (req, res, next) {
    Booking.create(req.body).then(function (booking) {
        res.send(booking);
    }).catch(next);
});

//delete reservations
router.delete('/booking/:id', function (req, res, next) {
    Booking.findByIdAndRemove({_id: req.params.id}).then(function (booking) {
        res.send(booking);
    });
});

//update reservation
router.put('/booking/:id', function (req, res, next) {
    Booking.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        Booking.findOne({_id: req.params.id}).then(function (booking) {
            res.send(booking);
        });
    });
});

module.exports = router;