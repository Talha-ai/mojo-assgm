const router = require("express").Router();
const passport = require("passport");
const User = require('../models/userModel')
require('dotenv').config();

// router.get("/login/success", (req, res) => {
//   console.log('called', req.user)
//   if (req.user) {
//     res.status(200).json({
//       message: "Successfully logged in",
//       user: req.user,
//     });
//   } else {
//     res.status(401).json({
//       message: "Authentication failed",
//     });
//   }
// });

router.get("/login/success", async (req, res) => {
  try {

    const user = await User.findOne({ verified: true });

    if (user) {
      res.status(200).json({
        message: "Successfully logged in",
        user: user,
      });
    } else {
      res.status(401).json({
        message: "Authentication failed or user not verified",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/login/failed", (req, res, error) => {
  res.status(401).json({
    success: false,
    message: "Login failed",
    error: error ? error.message : "Unknown error",
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).json({ message: "Logout successful" });
  });
});


router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login/failed",
    successRedirect: "https://mojo-assgm.vercel.app",
  }),
);

module.exports = router;
