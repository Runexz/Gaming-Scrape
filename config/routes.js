// Include routes in server file
module.exports = function (router) {
    // Route renders the home handlebars page
    router.get("/", function (req, res) {
        res.render("articles", {
            style: "style.css",
            javascript: "articles.js"
        });
    });
}