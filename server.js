// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');


var movies = require('./app/movie-crud');
var city = require('./app/city-crud');
var theatre = require('./app/theatre-crud');
var showtime = require('./app/showtime-crud');
var assign = require('./app/assign-crud');
var book = require('./app/bookings-crud');

//sample db configuration ===========================================

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.ynntg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('DB connected successfully')
}).catch((e) => {
  console.log(e)
})

app.use(bodyParser.json({})); // parse application/json

app.use('/movie', movies);
app.use('/city',city);
app.use('/theatre',theatre);
app.use('/showtime',showtime);
app.use('/assign',assign);
app.use('/book',book);

var port = process.env.PORT || 3000; // set our port
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('server runs on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
