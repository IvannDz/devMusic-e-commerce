require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");

const routes = require("./routes/index.js");
const volleyball = require("volleyball");
const { User } = require("./models");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
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

/* passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.ID_FB_CLIENT,
      clientSecret: process.env.SECRET_FB_CLIENT,
      callbackURL: "http://localhost:8080/api/auth/facebook",
      //profileFields: ["id", "email", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);

      const user = await User.findOne({ facebookId: profile.id });

      if (user) {
        done(null, user);
      } else {
        console.log(profile._json);
        const { first_name, email, id } = profile._json;

        const newUser = User.create({
          facebookId: id,
          userName: first_name,
          email: email,
          password: id,
        });

        return done(null, newUser);
      }
    }
  )
);
 */
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
  app.listen(4747, () => {
    console.log("listen on port 4747");
  })
);
