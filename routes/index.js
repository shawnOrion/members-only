const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User, Message } = require("../models");
// local strategy

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

// GET signup page
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

// POST new user
router.post("/sign-up", async (req, res, next) => {
  const { name, email, password, status } = req.body;
  try {
    // encrypt the password and create a user
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      const user = new User({
        name,
        email,
        password: hashedPassword, // save the hashed password
        status,
      });

      await user.save();

      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
});

// handle login
router.post(
  "/login",
  (req, res, next) => {
    console.log("login route");
    console.log(req.body);
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up",
  })
);

module.exports = router;
