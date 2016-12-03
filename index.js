var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose'); 

var app = express();
var routes = require('./routes');

app.use(session({secret: 'abcdefg12345' , resave: true, saveUninitialized: true , cookie: { maxAge: 600000 }}));
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine' , 'ejs');
app.use(express.static('views'));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/game");

var Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
  name: String,
  password: String,
  phone: String,
  studentId: String,
  level: {
    type: Number,
    default: 1 
  }
});

var gameSchema = new Schema({
  studentId: String,
  board: [Number],
  updated: { type: Date, default: Date.now },
  level: {
    type: Number,
    default: 1 
  },
  isOver: {
    type: Number,
    default: 0
  },
  gameId: Number
});

user = mongoose.model("users", userSchema);
game = mongoose.model("games", gameSchema);


//routes
app.get('/' , routes.index);
app.get('/users' , routes.users);
app.get('*' , routes.badRequest);
app.post('/saveUser' , routes.newUser);
app.post('/checkLogin' , routes.checkLogin);
app.post('/newGame' , routes.newGame);
app.post('/checkSelect' , routes.checkSelect);


app.listen(8585, function () {
  console.log('app listening on port 8585!');
});
