if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


const initializePassport = require('./passport-config')
const res = require('express/lib/response')
//enthält getUserById und getUserByEmail
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

//Users später in Datenbank!!!
const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
//Session greift auf Environment Variabel zurück (muss später RNG sein)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//static files
//css + js
app.use(express.static('public'));
app.use('css', express.static(__dirname + 'public/css'))
app.use('js', express.static(__dirname + 'public/js'))
//app.use(express.static('../HacknDashAWD/resources/css/' + 'game.css'));

//displayt index.ejs 
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

//Login Route
app.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login.ejs')
})

//Register Route
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

//Game Route
app.get('/game', checkAuthenticated, (req, res) => {
  res.render('game.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/game', checkAuthenticated,  (req, res) =>{
  res.redirect('/game')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch{
        res.redirect('/register')
    }
    console.log(users)
})

//delte request zum ausloggen
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })

//check ob User access zur Seite hat
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }

//check ob User keinen access hat (bereits eingeloggt bspsw)
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

app.listen(3000)