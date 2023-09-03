const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { User, Message } = require("../models");
// local strategy

/* GET home page. */
router.get("/", async function (req, res, next) {
  const messages = await Message.find({}).populate("user");
  console.log(messages);
  res.render("index", { user: req.user, messages });
});

// GET signup page
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.get("/secret", (req, res, next) => {
  res.render("secret", { passcode: "AlmostThere" });
});

router.get("/join-club", (req, res, next) => {
  res.render("join-club");
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

      res.redirect("/secret");
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/new-message", async (req, res, next) => {
  // req.body will be in the format: date, content
  // append the req.user
  // create a new message
  console.log("received new message");

  try {
    const message = new Message({
      content: req.body.content,
      user: req.user._id,
    });
    console.log(`new message: ${message}`);
    await message.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.post("/join-club", async (req, res, next) => {
  // update the status of this user
  const { passcode } = req.body;

  try {
    if (passcode === "AlmostThere" && req.user) {
      req.user.status = true;
      await req.user.save();
      console.log("user status: ", req.user.status);
    }
    res.redirect("/");
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
