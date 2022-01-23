const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){

    //Checks login variables
    const authenticateUser = async (email, password, done) => {
        //if user is not attached to email
        const user = getUserByEmail(email)
        if(user==null){
            return done(null, false, {message: 'Diese E-Mail ist keinem User zugeordnet.'})
        }

        //check password
        try {
            //if password is correct
            if(await bcrypt.compare(password, user.password)){
            return done(null, user)
                //if the password is wrong
            } else{
                return done(null, false, {message: 'Fehler: Das Passwort ist falsch.'})
            }
        } catch (e) {
          return done(e)
        }
      }

      passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
      passport.serializeUser((user, done) => done(null, user.id))
      passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
      })
    }

module.exports = initialize