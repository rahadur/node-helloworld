var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var User = require('./User');



var app = express();


var PORT = process.env.NODE_PORT || '8080';
var IP   = process.env.NODE_IP   || '127.0.0.1';
var ENV  = process.env.NODE_ENV  ==  'production';


// Database connection
mongoose.connect('mongodb://localhost:27017/showda', { useMongoClient: true });

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

app.post('/user', function(req, res,){

    var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.role = req.body.role;
        user.root = true;
        user.address = req.body.address;
        user.company = req.body.company;


        // Save new user account

        user.save(function (err, user) {
            if (err){
                return res.status(500).json({
                    "status": '500',
                    "message": "Something wrong please try again."
                });
            }

            // return response
            return res.status(200).json({
                'status': 200,
                'message': 'New user account created!',
                'user': user
            });
        });

});




// Start server listening
app.listen(PORT, IP, function(err){
    if(err) console.log(err);
    console.log('Server start listening at ' + IP + ':' + PORT);
  });






