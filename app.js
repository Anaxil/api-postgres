const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

//set up express app
const app = express();

//log requests to the console
app.use(logger("dev"));

//parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//require routes
require("./server/routes")(app);

//setup a default catch-all route that sends back a welcome message in JSON

app.get("*", (req, res) => res.status(200).send({
    message: "Witam w kursie"
}));

module.exports = app;