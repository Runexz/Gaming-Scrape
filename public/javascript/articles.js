
// When the SCRAPE NEW ARTICLES button is pressed ajax will be used to scrape data and reload the page.
$(".scrape-new").click(function () {
  console.log("SCAPED button has been pushed!")

  // Ajax will use the GET method to URL: /scrape that is pulled from server.js
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function (data) {
      console.log(data)
    })
  alert("The articles have been gathered");

  // Reload the page so handlebars can display those artiles
  window.location.reload();
  console.log("The page has been reloaded!")
});

// When the CLEAR SAVED ARTICLES button is pressed ajax will be used to scrape data and reload the page.
$(".clear-scrape").click(function () {
  console.log("CLEAR button has been pushed!")

  // Ajax will use the GET method to URL: /scrape that is pulled from server.js
  $.ajax({
    method: "DELETE",
    url: "/articles"
  })
    .then(function (data) {
      console.log(data)
    })
  alert("The articles have been cleared");

  // Reload the page so handlebars can display those artiles
  window.location.reload();
  console.log("The page has been reloaded!")
});

// When the Make a note button is pressed save the article
$(document).on("click", ".card", function () {
  console.log("This article has been selected: ")
  var thisId = $(this).children("div").children("h3").attr("data-id");
  var thisTitle = $(this).children("div").children("h5").text();
  var thisSummary = $(this).children("div").children("p").text();
  var thisLink = $(this).children("div").children("a").attr("href");
  console.log(thisId);
  console.log(thisTitle)
  console.log(thisSummary)
  console.log(thisLink)

  // Sends thisId, Title, Summary, Link to POST /notes
  $.ajax({
    method: "POST",
    url: "/notes",
    data: {
      title: thisTitle,
      summary: thisSummary,
      link: thisLink
    }
  })
    .then(function (data) {
      console.log(data);
      $('#exampleModal').modal('toggle')
    })
})