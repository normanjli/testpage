require(`dotenv`).config();
const express = require(`express`);
const passport = require("passport");
const flash = require(`connect-flash`);
const path = require("path");
const cors = require(`cors`);
const bcrypt = require(`bcryptjs`);
const LocalStrategy = require(`passport-local`).Strategy;
const app = express();
const port = process.env.PORT || process.env.SERVER_PORT;
const secret = process.env.SECRET;
const { createUser } = require("./controller");
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  require("express-session")({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    SameSite: 'strict',
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
const DATABASE_URL = process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require(`sequelize`);
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
});
const User = require("../models/user")(sequelize, DataTypes);

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const hashedPassword = bcrypt.hashSync(password, user.salt);
      if (!user.validPassword(hashedPassword)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);
app.post("/createacct", createUser);
app.post(
  `/login/auth`,
  passport.authenticate(`local`, {
    successFlash:`Welcome`
  })
);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
