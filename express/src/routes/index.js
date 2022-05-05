const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');

var userData = fs.readFileSync('src/userData.json', 'utf-8');
var mapData = fs.readFileSync('src/mapData.json', 'utf-8');
let Data = JSON.parse(userData);
let mData = JSON.parse(mapData);
var currentUser;


router.get('/signup', (req, res) => {
  res.render('signup');
});
router.get('/pagina', (req, res) => {
  res.render('pagina');
});
router.get('/menu', (req, res) => {
  res.render('menu',
  {Data,
  user1 : req.body.user1,
  password1: req.body.password1});  
});
router.get('/map1', (req, res) => {
  mapData = fs.readFileSync('src/mapData.json', 'utf-8');
  mData = JSON.parse(mapData);
  console.log(currentUser);
  var hasMapOne = false;
  mData.forEach(function(Dat1) {
    if(Dat1.user==currentUser && Dat1.mapNum==1){
      hasMapOne = true;
    }
  });
  if(hasMapOne){
    var mapData;
    mData.forEach(function(Dat1) {
      if(Dat1.user==currentUser && Dat1.mapNum==1){
        mapData = Dat1; 
      }
    });
    console.log("-----------------------------------------------------------------------should write " + JSON.stringify(mapData));
    fs.writeFileSync('src/Data.json', JSON.stringify(mapData), 'utf-8');
  } else {
    var newMap = {
      user: currentUser,
      mapNum: 1,
      mapData: {"id":[{"id":"saveButton","type":"save1","data":{},"position":{"x":0,"y":0}},{"id":"loadButton","type":"load1","data":{},"position":{"x":0,"y":35}}],"mapNum":'1', "currentUser": currentUser}
    }
    mData.push(newMap);
    // saving the array in a file
    const mapData = JSON.stringify(mData);
    fs.writeFileSync('src/mapData.json', mapData, 'utf-8');
    const def = {"id":[{"id":"saveButton","type":"save1","data":{},"position":{"x":0,"y":0}},{"id":"loadButton","type":"load1","data":{},"position":{"x":0,"y":35}}],"mapNum":'1', "currentUser": currentUser};
    fs.writeFileSync('src/Data.json', JSON.stringify(newMap), 'utf-8');
  }


  res.redirect('http://localhost:3000');
});



router.get('/map2', (req, res) => {
  mapData = fs.readFileSync('src/mapData.json', 'utf-8');
  mData = JSON.parse(mapData);
  console.log(currentUser);
  var hasMapOne = false;
  mData.forEach(function(Dat1) {
    if(Dat1.user==currentUser && Dat1.mapNum==2){
      hasMapOne = true;
    }
  });
  if(hasMapOne){
    var mapData;
    mData.forEach(function(Dat1) {
      console.log("mapNum == " + Dat1.mapNum)
      if(Dat1.user==currentUser && Dat1.mapNum==2){
        mapData = Dat1; 
      }
    });
    fs.writeFileSync('src/Data.json', JSON.stringify(mapData), 'utf-8');
  } else {
    var newMap = {
      user: currentUser,
      mapNum: 2,
      mapData: {"id":[{"id":"saveButton","type":"save1","data":{},"position":{"x":0,"y":0}},{"id":"loadButton","type":"load1","data":{},"position":{"x":0,"y":35}}],"mapNum":'2', "currentUser": currentUser}
    }
    mData.push(newMap);
    // saving the array in a file
    const mapData = JSON.stringify(mData);
    fs.writeFileSync('src/mapData.json', mapData, 'utf-8');
    //const def = {"id":[{"id":"saveButton","type":"save1","data":{},"position":{"x":0,"y":0}},{"id":"loadButton","type":"load1","data":{},"position":{"x":0,"y":35}}],"mapNum":'2', "currentUser": currentUser};
    fs.writeFileSync('src/Data.json', JSON.stringify(newMap), 'utf-8');
  }


  res.redirect('http://localhost:3000');
});




router.get('/map3', (req, res) => {
  mapData = fs.readFileSync('src/mapData.json', 'utf-8');
  mData = JSON.parse(mapData);
  console.log(currentUser);
  var hasMapOne = false;
  mData.forEach(function(Dat1) {
    if(Dat1.user==currentUser && Dat1.mapNum==3){
      hasMapOne = true;
    }
  });
  if(hasMapOne){
    var mapData;
    mData.forEach(function(Dat1) {
      if(Dat1.user==currentUser && Dat1.mapNum==3){
        mapData = Dat1; 
      }
    });
    fs.writeFileSync('src/Data.json', JSON.stringify(mapData), 'utf-8');
  } else {
    var newMap = {
      user: currentUser,
      mapNum: 3,
      mapData: {"id":[{"id":"saveButton","type":"save1","data":{},"position":{"x":0,"y":0}},{"id":"loadButton","type":"load1","data":{},"position":{"x":0,"y":35}}],"mapNum":'3', "currentUser": currentUser}
    }
    mData.push(newMap);
    // saving the array in a file
    const mapData = JSON.stringify(mData);
    fs.writeFileSync('src/mapData.json', mapData, 'utf-8');
    //const def = {"id":[{"id":"saveButton","type":"save1","data":{},"position":{"x":0,"y":0}},{"id":"loadButton","type":"load1","data":{},"position":{"x":0,"y":35}}],"mapNum":'3', "currentUser": currentUser};
    fs.writeFileSync('src/Data.json', JSON.stringify(newMap), 'utf-8');
  }


  res.redirect('http://localhost:3000');
});

router.get('/', (req, res) => {
  res.render('index', 
  { Data,
      user1 : req.body.user1,
      password1: req.body.password1
  });
});

router.post('/menu', (req, res) => {
  res.render('menu',
  {Data});
  
});

router.post('/',(req, res) => {
  const { user1, password1 } = req.body;
  currentUser = user1;
  var found = false;
  Data.forEach(function(Dat1) {
  if(Dat1.user==user1 && Dat1.password==password1){
    found = true;
  }
});
  if(found){
    res.render('menu', 
    { Data,
    user1 : req.body.user1,
    password1: req.body.password1
    });
  } else {
    res.redirect('/');
  }
  
});

router.post('/signup', (req, res) => {

  const { name, email, user, password } = req.body;

  if (!name || !email || !user || !password) {
    res.status(400).send("Entries must have a title and body");
    return;
  }

  var newDat = {
    id: uuidv4(),
    name,
    email,
    user,
    password
  };

  // add a new book to the array
  Data.push(newDat);

  // saving the array in a file
  const userData = JSON.stringify(Data);
  fs.writeFileSync('src/userData.json', userData, 'utf-8');
  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  Data = Data.filter(Dat => Dat.id != req.params.id);

  // saving data
  const userData = JSON.stringify(Data);
  fs.writeFileSync('src/userData.json', userData, 'utf-8');

  res.redirect('/')
});

module.exports = router;