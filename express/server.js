var express = require('express');
var app = express();
const router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');

var PORT = 3001;
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var publicPath = path.join(__dirname, 'public');




router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
});


app.get('/signup', function (req, res) {
    res.send(publicPath + '/signup.html');
});

app.get('/home', function (req, res) {
    res.send(publicPath + '/home.html');
});

app.listen(PORT, function(){
	console.log('server is listening on ' + PORT);
});