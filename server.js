const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const signin = require("./controllers/signin");
const signup = require("./controllers/signup");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

// Instead of using body parser
// Use this
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Success"));
app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post("/signup", (req, res) => signup.handleSignup(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => profile.handleGetProfile(req, res, db));
app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
