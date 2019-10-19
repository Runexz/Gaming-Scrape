// Variable used to grab from NPM dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Port to be either the host's port or 3000
var PORT = process.env.PORT || 3000;

// Initialize NPM Express
var app = express();

// Sets up Express router
var router = express.Router();

// Require routes file
require("./config/routes")(router);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connects handlebars views folder layout "main.handlebars"
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// All requests go through the router middleware
app.use(router);

// If app is deployed, use the deployed database. Otherwise use the local database called gamingHeadlines
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1122:user2211@ds337418.mlab.com:37418/heroku_7nqhswkw";

// Connect to the mongo DB
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`db error ${err.message}`);
    });

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.gameinformer.com").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Save an empty result object
        var result = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $("div.article-summary").each(function (i, element) {


            // Save the text of the h2-tag as "title"
            var title = $(element).children("h2").text();

            // Save the link from h2 with an a href into a variable
            var link = $(element).children("h2").children("a").attr("href");

            // Save the summary from p element into a variable
            var summary = $(element).children("p").text();

            // RegExr the variables
            if (title && summary && link) {
                var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var linkNeat = link.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var neatTogether = {
                    title: titleNeat,
                    summary: summaryNeat,
                    link: linkNeat
                };

                // Pushes the title, summary, link into result variable
                result.push(neatTogether);
            }
        });
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
            .then(function (dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, log it
                console.log(err);
            });
        res.send(result);
    });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for getting all Note info from the db
app.get("/notes", function (req, res) {
    // Grab every document in the Note collection
    db.Note.find({})
        .then(function (dbNote) {
            // If we were able to successfully find Notes, send them back to the client
            res.json(dbNote);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for posting saved article to notes db
app.post("/notes", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If we were able to successfully create a note and send it back to the client
            res.json(dbNote);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
app.put("/notes/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })

        // db.Note.updateOne(req.body)
        .then(function (dbNote) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbNote);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Listen on port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
})
