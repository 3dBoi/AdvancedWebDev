if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const db = require ('./database').db;
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');


const initializePassport = require('./passport-config');
const res = require('express/lib/response');
//enthält getUserById und getUserByEmail
initializePassport(
  passport,
  email => db.query('SELECT * FROM userlist WHERE email = ?', [email], (error, result, fields) => {
    if (error)
      return undefined;
    return result[0].username || undefined;
  }),
  id => users.find(user => user.id === id)
);


//Users später in Datenbank!!!
const users = []

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

app.post('/login', checkNotAuthenticated, async (req, res) => {//passport.authenticate('local',{
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      db.query('SELECT email FROM userlist WHERE email = (reqbodyemail) && password = (hashedPassword) VALUES(?,?))', [req.body.email, hashedPassword ]);
      console.log(db.query('SELECT email FROM userlist WHERE email = (reqbodyemail) && password = (hashedPassword) VALUES(?,?))', [req.body.email, hashedPassword ]));

    } catch (error) {
      res.redirect('/login');
    }

   
    successRedirect: '/';
    //failureRedirect: '/login',
   // failureFlash: true
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // TODO: Check for existance
        db.query('INSERT INTO userlist (email, username, password) VALUES ( ?, ?, ?)', [req.body.email, req.body.name, hashedPassword]);
       // res.redirect('/login');
       res.redirect('/');
    } catch {
        res.redirect('/register');
    }
    console.log(users);
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

app.listen(3000);