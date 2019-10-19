
// When the Make a note button is pressed save the article
// $(document).on("click", ".card", function() {
//     console.log("This article has been selected: ")
//     var thisId = $(this).children("div").children("h3").attr("data-id");
    
//     console.log(thisId);

    // $('#exampleModal').modal('toggle')
    
    // $(".save-note").click(function(){
    //     event.preventDefault();
    //     console.log("I was pressed");
    //     console.log($(".form-control").text());
    // })

    // $.ajax({
    //   method: "POST",
    //   url: "/notes",
    //   data: {
    //     title: thisTitle,
    //     summary: thisSummary,
    //     link: thisLink
    //   }
    // })
    // .then(function(data) {
    //   console.log(data);
      
    // })
    

// })

$(document).on("click", ".card", function(){
    event.preventDefault();

    var thisID = $(this).children("div").children("h3").attr("data-id");
    var newNote = $("#newMessage").val();

    console.log(newNote);
    console.log(thisID);

    $.ajax({
        method: "PUT",
        url: "/notes/" + thisID,
        data: {
            note: newNote
        }
    })
    // With that done
    .then(function(data) {
        // Log the response
        console.log(data);
        
        
      });
      location.reload();

})
