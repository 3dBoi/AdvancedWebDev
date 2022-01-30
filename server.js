if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const database = require ('./database');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');


const initializePassport = require('./passport-config');
const res = require('express/lib/response');
initializePassport(passport);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
//Session greift auf Environment Variabel zurück (muss später RNG sein)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//static files
//css + js
app.use(express.static('public'));
app.use('css', express.static(__dirname + 'public/css'));
app.use('js', express.static(__dirname + 'public/js'));
app.use('fonts', express.static(__dirname + 'public/fonts'));
app.use('images', express.static(__dirname + 'public/images'));
//app.use(express.static('../HacknDashAWD/resources/css/' + 'game.css'));

//displayt index.ejs 
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name});
});

//Login Route
app.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login.ejs');
});

//Register Route
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

//Game Route
app.get('/game', (req, res) => {
  res.render('game.ejs');
});

app.post('/login', checkNotAuthenticated, async (req, res) => passport.authenticate('local', {
    successRedirect: '/game',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Check for existence
        const existsQuery = await database.runQuery('SELECT * FROM userlist WHERE email = ?', [req.body.email]);
        if (existsQuery.result.length) {
          runQuery('INSERT INTO userlist (email, username, password) VALUES (?, ?, ?)', [req.body.email, req.body.name, hashedPassword]);
          res.redirect('/');
        }
    } catch (e) {
        res.redirect('/register');
    }
})

//delte request zum ausloggen
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
  })

//check ob User access zur Seite hat
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/login');
  }

//check ob User keinen access hat (bereits eingeloggt bspsw)
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  }

//fetch stats
function fetchStats(req){
var stats = [];
// stats = db.query('SELECT * FROM stats WHERE userID = ? ', [req]);
return stats;
}

//create leaderBoard
function createLeaderBoard() {
var leaderBoard = [];
let leaderBoardConstructor0 = [];
let leaderBoardConstructor1 = [];
let leaderBoardConstructor2 = [];

//leaderBoardConstructor0= db.query('SELECT userID,gamesplayed,personalBestScore0,personalBestTime0 FROM stats ORDER BY personalBestScore0 desc');

//leaderBoardConstructor1= db.query('SELECT userID,gamesplayed,personalBestScore1,personalBestTime1 FROM stats ORDER BY personalBestScore1 desc');

//leaderBoardConstructor2= db.query('SELECT userID,gamesplayed,personalBestScore2,personalBestTime2 FROM stats ORDER BY personalBestScore2 desc');

 leaderBoard = database.db.query('SELECT * FROM stats ORDER BY score desc');

 return leaderBoard;
}


//gameOverDBwrite
function deathWrite(id, Score, time) {
  gamesplayed = [];
  let gamesplayed = database.db.query('SELECT gamesplayed FROM stats WHERE userID = ? ORDER BY gamesplayed desc',[id]);

  if(gamesplayed.length==0){
    gamesplayed[0] = 1;
  }else{
    gamesplayed[0] +=1; 
  }
  
  database.db.query('INSERT INTO stats (userID, gamesplayed, score, time) VALUES (?, ?, ?, ?)', [id, Score, time, gamesplayed[0]]);

}


app.listen(3000);