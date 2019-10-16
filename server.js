// Variable used to grab from NPM dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

// Port to be either the host's port or 3000
var PORT = process.env.PORT || 3000;

// Initialize NPM Express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If app is deployed, use the deployed database. Otherwise use the local database called gamingHeadlines
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gameingHeadlines";

// Connect to the mongo DB
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(`db error ${err.message}`);
    });

// Listen on port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
})