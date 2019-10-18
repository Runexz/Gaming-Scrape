// Require all models
var Article = require("../models/Article");
var Note = require("../models/Note");

// Include routes in server file
module.exports = function (router) {
    // Route renders the home handlebars page
    router.get("/", function (req, res) {
        Article.find(function (err, Article) {
            res.render("articles", {
                style: "style.css",
                javascript: "articles.js",
                articleSchema: Article
            });
        })
    });

    // Route renders the saved handlebars page
    router.get("/saved", function (req, res) {
        Note.find(function (err, Note) {
            res.render("saved", {
                style: "saved.css",
                javascript: "saved.js",
                noteSchema: Note
            });
        })
    });
}