// Include routes in server file
module.exports = function (router) {
    // Route renders the home handlebars page
    router.get("/", function (req, res) {
        res.render("articles", {
            style: "style.css",
            javascript: "articles.js"
        });
    });

    // Route renders the saved handlebars page
    router.get("/saved", function (req, res) {
        res.render("saved", {
            style: "saved.css",
            javascript: "saved.js"
        });
    });
}