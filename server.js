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

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Check for existence
        const existsQuery = await database.runQuery('SELECT * FROM userlist WHERE email = ?', [req.body.email]);
        if (!existsQuery.result.length) {
            database.runQuery('INSERT INTO userlist (email, username, password) VALUES (?, ?, ?)', [req.body.email, req.body.name, hashedPassword]);
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
});

// Highscore page
app.get('/highscore', async (req, res) => {
    const leaderboard = await createLeaderBoard();
    res.render('highscore.ejs', {
        entries: leaderboard
    });
});

// Profile page
app.get('/profile', checkAuthenticated, async (req, res) => {
    const stats = await fetchStats(req.user.id); // < id should exist, since the user has to be authenticated to be here
    const gamesplayedQuery = await database.runQuery('SELECT MAX(gamesplayed) AS gamesplayed FROM stats WHERE userID = ? LIMIT 1', [req.user.id]);
    var gamesplayed = 0;
    if (gamesplayedQuery.result.length && gamesplayedQuery.result[0].gamesplayed != null) {
        gamesplayed = gamesplayedQuery.result[0].gamesplayed;
    }
    res.render('profile.ejs', {
        entries: stats,
        gamesplayed: gamesplayed
    });
});

app.post('/profile', checkAuthenticated, async (req, res) => {
    if (!req.body.score || !req.body.time) {
        res.status(400).send('Malformed request');
        return;
    }

    const gamesplayedQuery = await database.runQuery('SELECT MAX(gamesplayed) AS gamesplayed FROM stats WHERE userID = ? LIMIT 1', [req.user.id]);
    var gamesplayed = 0;
    if (gamesplayedQuery.result.length && gamesplayedQuery.result[0].gamesplayed != null) {
        gamesplayed = gamesplayedQuery.result[0].gamesplayed;
    }
    // Insert this game
    await database.runQuery('INSERT INTO stats (userID, score, time, gamesplayed) VALUES (?, ?, ?, ?)', [req.user.id, req.body.score, req.body.time, gamesplayed]);
    // increase games played
    database.runQuery('UPDATE stats SET gamesplayed = gamesplayed + 1 WHERE userID = ?', [req.user.id]);
});

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
async function fetchStats(userID) {
    var stats = [];

    const statsQuery = await database.runQuery('SELECT username, score, time FROM stats JOIN userlist ON stats.userID = userlist.id WHERE userID = ? ORDER BY score desc LIMIT 3', [userID]);
    statsQuery.result.forEach((entry) => {
        stats.push({
            score: entry.score,
            time: entry.time
        });
    });
  
    return stats;
}

//create leaderBoard
async function createLeaderBoard() {
    var leaderBoard = [];

    leaderboardQuery = await database.runQuery('SELECT username, score, time FROM stats JOIN userlist ON stats.userID = userlist.id ORDER BY score desc LIMIT 10');
    leaderboardQuery.result.forEach((entry) => {
        leaderBoard.push({
            user: entry.username,
            score: entry.score,
            time: entry.time
        });
    });
    return leaderBoard;
}


//gameOverDBwrite
function deathWrite(id, Score, time) {
    gamesplayed = [];
    let gamesplayed = database.db.query('SELECT gamesplayed FROM stats WHERE userID = ? ORDER BY gamesplayed desc', [id]);

    if (gamesplayed.length==0) {
        gamesplayed[0] = 1;
    } else {
        gamesplayed[0] +=1; 
    }
    
    database.db.query('INSERT INTO stats (userID, gamesplayed, score, time) VALUES (?, ?, ?, ?)', [id, Score, time, gamesplayed[0]]);
}

app.listen(3000);