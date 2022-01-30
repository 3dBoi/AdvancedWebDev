const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const runQuery = require('./database').runQuery;

function userFactory(id, email, username, password) {
    return {
        id: id,
        email: email,
        username: username,
        password: password
    };
}

const getUserByEmail = (async (email) => {
    try {
        const response = await runQuery('SELECT * FROM userlist WHERE email = ?', [email]);
        const row = response.result[0];
        console.log(row);
        if (row) {
            return userFactory(row.id, row.email, row.username, row.password);
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined; // eh, good enough
    }
});

const getUserById = (async (id) => {
    try {
        const response = await runQuery('SELECT * FROM userlist WHERE id = ?', [id]);
        const row = response.result[0];
        console.log(row);
        if (row) {
            return userFactory(row.id, row.email, row.username, row.password);
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined; // eh, good enough
    }
});

function initialize(passport){
    //Checks login variables
    const authenticateUser = async (email, password, done) => {
        //if user is not attached to email
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: 'Fehler: Diese E-Mail ist keinem User zugeordnet.'});
        }

        //check password
        try {
            //if password is correct
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
                //if the password is wrong
            } else {
                return done(null, false, {message: 'Fehler: Das Passwort ist falsch.'});
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}

module.exports = initialize;