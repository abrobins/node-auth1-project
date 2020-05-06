const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/router");
const restricted = require("../auth/middleware.js");

const server = express();
const sessionConfig = {
  name: "monster",
  secret: "shhhhh, keep it secret!",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // true in production to send only over https
    httpOnly: true // true means no access from JS
  },
  resave: false,
  saveUninitialized: true // GDPR laws required to check with client
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "API is up" });
});

module.exports = server;
