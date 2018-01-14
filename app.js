/**
 * Created by JedBr on 12/26/2017.
 */

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var path = require('path');
var _  = require('lodash');
var routes = require('./routes/api');

//set app object
var app = express();

//Set middleware
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname, '')));//set directory for static files
app.use('/api', routes);

app.set('views', path.resolve(__dirname, '', ''));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//handle 404 error
app.use(function (req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

//Set default route
app.get('/', function (req, res) {
   res.send();// pass path to home page.
});

//Connect to db with mongoose
mongoose.connect('mongodb://jedbrundidge:Nek8245oosa!@cluster0-shard-00-00-wqfr3.mongodb.net:27017,cluster0-shard-00-01-wqfr3.mongodb.net:27017,cluster0-shard-00-02-wqfr3.mongodb.net:27017/CHR_Project?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
mongoose.Promis = global.Promise;
mongoose.connection.on('open', function () {


    app.listen(process.env.port || 3000);
    console.log("CHR project app is running on port 3000");
});