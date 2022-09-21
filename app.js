require("dotenv").config();
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

/* security middleware */
const hpp = require("hpp");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

/* security middleware implement */
app.use(hpp());
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());

/* body parser implement */
app.use(bodyParser.json());

/* rate limit implement */
const limiter = rateLimit({ windowMs: 15 * 60 * 1000 });

/* managing frontend routing */
app.use(express.static("frontend/build"));

app.get("*", (req, res) => {
  req.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

/* managing backend api routing */
app.use("/api/v1", router);

module.exports = app;
