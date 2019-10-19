
// Gets the ID number, text of the note and updates the Note Database
$(document).on("click", ".card", function () {
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
        .then(function (data) {
            // Log the response
            console.log(data);
        });
    // Reload the page
    location.reload();
});
