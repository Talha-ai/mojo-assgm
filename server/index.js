const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");

const app = express();
require("dotenv").config();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,HEAD,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    domain: undefined,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
require("./passport");

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`AUP service running on port ${PORT}`);
});


