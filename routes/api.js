/**
 * Created by JedBr on 1/2/2018.
 */
var express = require('express');
var router = express.Router();
var Booking = require('../models/bookingSchema');
var rp = require('request-promise');
var request = require('request');
const url = require('url');
const querystring = require('querystring');




/*router.get('/weather/averageTemps', function () {
    request({
        uri: 'http://5a3844bcbe179d0012970288.mockapi.io/api/v1/weather'
    }).pipe(res);
});*/

router.get('/weather/average_temps/', function (req, res) {

    const options = {
        method: 'GET',
        url: 'https://5a3844bcbe179d0012970288.mockapi.io/api/v1/weather/',
        simple: false,
        json: true,
        rejectUnauthorized: false,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        qs: {
            day: 1
        }

    };

    rp(options)
        .then(function (response, body) {
            console.log(res.send(response));
            //console.log(req.params);
            //res.send("Query" + req.query.qs);
        })
        .catch(function (err) {
            console.log(err);
        });
});




//get all objects from the database
router.get('/booking', function (req, res, next) {
    Booking.find({}).then(function (booking) {
        response.getBody()
    });
});

router.get('/booking/cabinOne', function (req, res, next) {

    Booking.find({"cabinNum": 1}).then(function (booking) {
        res.send(booking);
    });

});

router.get('/booking/cabinTwo', function (req, res, next) {

    Booking.find({"cabinNum": 2}).then(function (booking) {
        res.send(booking);
    });

});

router.get('/booking/cabinThree', function (req, res, next) {

    Booking.find({"cabinNum": 3}).then(function (booking) {
        res.send(booking);
    });

});


//route handler for booking cabins
router.post('/booking/addReservation', function (req, res, next) {
    Booking.create(req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
        console.log("Sent");
    });
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