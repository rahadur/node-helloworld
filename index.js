var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');



var app = express();


var PORT = process.env.NODE_PORT || '3000';
var IP   = process.env.NODE_IP   || '127.0.0.1';
var ENV  = process.env.NODE_ENV  ==  'production';


// Database connection
mongoose.connect('mongodb://localhost:27017/hello');

// Setup EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Setup static folder for assets
app.use(express.static(path.join(__dirname, 'public')));


// Setup body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){

    res.render('index');
});




// Start server listening
app.listen(PORT, IP, function(err){
    if(err) console.log(err);
    console.log('Server start listening at ' + IP + ':' + PORT);
  });






