require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./config/db");

const routes = require("./routes/index.js");
const volleyball = require("volleyball");
const { User } = require("./models");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");

// middlewars
app.use(cors());
app.use(volleyball);
app.use(cookieParser());
app.use(sessions({ secret: "devMusiquita" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            // email not found
            return done(null, false);
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // wrong password
            }

            return done(null, user); // success :D
          });
        })
        .catch(done); // done(err)
    }
  )
);
/* 
passport.use(new FacebookStrategy({
  clientID: 3857035394399350,
  clientSecret: "e29b86e16c105b5ca6b185750e6c047e",
  callbackURL: "http://localhost:8080/api/auth/facebook",
  profileFields: ['id', 'displayName', 'email']
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({where: {id: profile.id}}, function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
)); */

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use("/api", routes);

db.sync({ force: false }).then(() =>
  app.listen(8080, () => {
    console.log("listen on port 8080");
  })
);
