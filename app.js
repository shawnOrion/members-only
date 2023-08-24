var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const { User, Message } = require("./models");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// what is this
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("authenticating...");
      console.log("username: ", username);
      console.log("password: ", password);
      const user = await User.findOne({ email: username });
      // if user not found
      if (!user) {
        console.log("user not found");
        return done(null, false, { message: "Incorrect email" });
      }
      // verify the password
      const match = bcrypt.compare(password, user.password);
      if (!match) {
        console.log("incorrect password");
        return done(null, false, { message: "Incorrect password" });
      }
      // if user found and password is correct
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// share the user variable to other files
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// connect to the database
const connectionString = `mongodb+srv://shawnorion07:${process.env.database_pw}@cluster0.zpaxh9t.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
module.exports = app;
