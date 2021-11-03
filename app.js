const express = require("express");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//static folder
app.use(express.static(path.join(__dirname, "public")));

//require users routes
const users = require("./routes/users");

app.use("/users", users);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//connection database
const config = require("./config/database");
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log(`database ${config.database} terhubung...`);
});

app.get("/", (req, res) => {
  res.send("endpoint");
});

app.listen(PORT, () => console.log(`server berjalan pada port ${PORT}...`));
