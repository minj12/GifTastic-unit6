$(document).ready(function () {
  // Main global variables
var topics = ["Batman", "Guardians of the Galaxy", "Star-Trek", "Star-Wars", "Futurama", "Flash Gordan", "Wander Over Yonder", "Development", "Galaxy Quest", "Interstellar"];
var siten;
  // creating buttons for topics array
  for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("btn btn-secondary");
      button.text(topics[i]);
      button.attr("data-meme", topics[i]);
      $("#memeButtons").append(button);
  }
  // function for submit button
  $("#addMeme").on("click", function (event) {
   // preventing the button from trying to submit the form
      event.preventDefault();
      var inputMeme = $("#meme-input").val().trim();
      var newButton = $("<button>");
      newButton.addClass("btn btn-secondary");
      newButton.text(inputMeme);
      newButton.attr("data-meme", inputMeme);
      $("#memeButtons").append(newButton);
  })
  // event listener for meme buttons
  $("#memeButtons").on("click", "button", function () {
      $("#gifsHere").empty();
      siten = $(this).attr("data-meme");
      // storing giphy API URL for random memes
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + siten + "&api_key=zZpHwgeLyNsagu20ptH3a5OTh0gx5742&limit=10";
      // performing an AJAX request with the query URL
      $.ajax({
          url: queryURL,
          method: "GET"
      })
          // after data comes back from the request
          .done(function (response) {
              var results = response.data;
              for (var i = 0; i < results.length; i++) {
                  var memeDiv = $("<div>");
                  memeDiv.addClass("memeDiv");
                  var rating = $("<p>").text("Rating: " + results[i].rating);
                  var memeImage = $("<img>");
                  memeImage.addClass("gif");
                  // storing still and animated gifs 
                  memeImage.attr("src", results[i].images.fixed_height_still.url);
                  memeImage.attr("data-still", results[i].images.fixed_height_still.url);
                  memeImage.attr("data-animate", results[i].images.fixed_height.url);
                  memeImage.attr("data-state", "still")
                  memeDiv.append(rating);
                  memeDiv.append(memeImage);
                  $("#gifsHere").append(memeDiv);
              }
              // click function for gifs 
              $(".gif").on("click", function () {
                  var state = $(this).attr("data-state");
                  if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                  } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                  }
              })
          })
  })
});