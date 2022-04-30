const express = require('express');
const path    = require('path');
const logger  = require('morgan');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
const app = express();
var nodes = [];
var mapNum = -1;
var currentUser = -1;
// Settings
app.set('port', 3001);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.use(bodyParser.json());
// Routes
app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

//Looking for info from react
app.use(
	cors({
	  origin: 'http://localhost:3000',
	  credentials: true,
	})
);

//passing to react
app.get("/api", (req, res) => {
  var userData = fs.readFileSync('src/Data.json', 'utf-8');
  var temp = JSON.parse(userData);
  nodes = temp.id;
  if(mapNum == -1){
    mapNum = temp.mapNum;
    currentUser = temp.currentUser;
  }
	res.json({ 
		nodes
	 });
});
//temp, viewing data from react
app.get('/createTest', function(req, res) {
	console.log('Inside Home Login');
	res.writeHead(200, {
	  'Content-Type': 'application/json',
	});
	console.log('Nodes : ', JSON.stringify(nodes));
	res.end(JSON.stringify(nodes));
  });

//getting data from react
app.post('/create', function(req, res) {
	const newNode = {
	  id: req.body.els,
	};
  
	nodes = (newNode);
	console.log(JSON.stringify(newNode));
	//console.log(nodes);


  let mapData = fs.readFileSync('src/mapData.json', 'utf-8');
  let mData = JSON.parse(mapData);
  mData.forEach(function(Dat1) {
    if(Dat1.user==currentUser && Dat1.mapNum==mapNum){
      console.log("OLD Dat1: " + Dat1.mapData);
      Dat1.mapData = nodes;
      console.log("NEW Dat1: " + Dat1.mapData);
      fs.writeFileSync('src/Data.json', JSON.stringify(nodes), 'utf-8');
      console.log("data is: " + JSON.stringify(nodes));
    }
  });
  fs.writeFileSync('src/mapData.json', JSON.stringify(mData), 'utf-8');
  // const mapData = JSON.stringify(mData);
  // fs.writeFileSync('src/mapData.json', mapData, 'utf-8');
  });


// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

module.exports = app;