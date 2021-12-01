require(`dotenv`).config();
const DATABASE_URL = process.env.DATABASE_URL;
const port = process.env.PORT || process.env.SERVER_PORT;
const secret = process.env.SECRET;
const express = require(`express`);
const passport = require("passport");
const flash = require(`connect-flash`);
const path = require("path");
const cors = require(`cors`);
const bcrypt = require(`bcryptjs`);
const app = express();
const session = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);
const {
  createUser,
  changeUser,
  deleteUser,
  likeDrink,
  login,
  unLikeDrink,
  getLikedDrinks,
} = require("./controller");
const { Sequelize, DataTypes } = require(`sequelize`);
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: `postgres`,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const User = require("../models/user")(sequelize, DataTypes);
const mySessionStore = new SequelizeStore({
  db: sequelize,
});
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:3000`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  session({
    secret: secret,
    store: mySessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: { sameSite: "strict" },
  })
);
mySessionStore.sync();
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require(`passport-local`).Strategy;
passport.use(
  new LocalStrategy(async function (username, password, done) {
    User.findOne({ where: { username: username } })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const hashedPassword = bcrypt.hashSync(password, user.salt);
        if (user.password !== hashedPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user.id);
      })
      .catch((err) => done(err));
  })
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.post("/api/createacct", createUser);

app.post(`/api/login/auth`, passport.authenticate(`local`), login);

app.get("/api/logout", async (req, res) => {
  req.session.destroy((err) => console.log(err));
  req.logOut();
  res.status(`200`).send(`logout successful`);
});
app.get(`/api/user`, async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send(`Authenticated`);
  } else {
    res.status(404).send(`User Not found`);
  }
});
app.put(`/api/user/change`, changeUser);
app.delete(`/api/user/delete`, deleteUser);
app.delete(`/api/user/unlike/:id`, unLikeDrink);
app.put(`/api/user/like`, likeDrink);
app.get(`/api/user/like/list`,getLikedDrinks)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
