/**
 * Created by JedBr on 1/2/2018.
 */
var express = require('express');
var router = express.Router();
var Booking = require('../models/bookingSchema');
var rp = require('request-promise');
var request = require('request');




router.get('/weather/averageTemps', function (req, res, next) {
    request({
        uri: 'http://5a3844bcbe179d0012970288.mockapi.io/api/v1/weather'
    }).pipe(res);
});

router.get('/weather/average_temps/', function (req, res) {

    const options = {
        method: 'GET',
        url: 'https://5a3844bcbe179d0012970288.mockapi.io/api/v1/weather/',
        simple: false,
        json: true,
        rejectUnauthorized: false,
        qs: {
            day: 4
        }
    };

    rp(options)
        .then(function (response) {
            console.log(res.send(response));
            //console.log(req.params);
            //res.send("Query" + req.query);
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
    debugger;
   Booking.find({
       cabinNum: req.body.cabinNum
   }).then( bookings => {
       bookings.forEach ( booking => {
          const x1 = new Date(booking.dateIn)
           const y1 = new Date(booking.dateOut)
           const {dateIn, dateOut} = req.body
           const x = new Date(dateIn), y  =new Date(dateOut)
           if ( (x >= x1 && y <= y1) || (x >= x1 && x1 >= y) || (x >= y1 && y1 >= y) ) {
              return res.status(400).send('Reservation already Taken')
           }
       })
       return Booking.create(req.body)
   }).then ( newBooking => res.json(newBooking))
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