//Setting Initial Array Values
var gifys = ["Batman", "Guardians of the Galaxy", "Star-Trek", "Star-Wars", "Futurama", "Flash Gordan", "Wander Over Yonder", "Development", "Galaxy Quest", "Interstellar"];

function displayGifInfo(gifName) {

  //Main variables
  var gify = $(this).attr("data-name");
  var limit = 10;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gify + "&limit="+ limit + "&api_key=ED5M7CisPjLAtbyt9UiIJpQdgioBnDSz&limit=10";

  //AJAX uses "Get" to bring data from var queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {

    //console logging
    console.log(queryURL);
    console.log(response); 

    //var assignments from html doc
    var gifyDiv = $("<div class='gify'>");
    
    var results = response.data;


    //Clears out previous giphy set before adding a new set
    $("#gif-view").empty();
    for (var i = 0; i < gifys.length; i++) {

      //Filtering Guidance rateing//NO ADULT CONTENT 
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        // Generating div with class "item"
        var gifyDiv = $("<div class='item'>");

        //Generating a div to hold the giphys
        var gifyDiv = $("<div>");

        //Storing rating response
        var rating = response.data.rating;

        //Fetching URL for image
        var imgURL = response.rating;

        //Generating <p> and rating
        var p = $("<p>").text("Rating: " + results[i].rating );

        //Generating image tag
        var gify = $("<img>");

        //Defining src attribute of the images pulled
        gify.attr("src", results[i].images.fixed_height.url);
        gify.attr("src",)

        //Appending rating to giphy
        gifyDiv.append(p);
        gifyDiv.append(gify);

        //Setting src and URL attributes to giphy
        var image = $("<img>").attr("src", imgURL);

        //Appending the giphy
        gifyDiv.append(image);

        //Prepending new giphys above previosly called giphys
        $("#gify-view").prepend(gifyDiv);
      };
    };
  });
};

//Calling renderButtons function
function renderButtons() {

  //Prevents repeated buttons
  $("#buttons-view").empty();

  //For Loop
  for (var i = 0; i < gifys.length; i++) {

    //Button
    var a = $("<button>");
    //Adding class of gify
    a.addClass("gify");
    //Adding data-attribute
    a.attr("data-name", gifys[i]);
    //Adding button text
    a.text(gifys[i]);
    //Appending the button to HTML
    $("#buttons-view").append(a);
  };
};

//On.click function; prevents duplicatation of initial buttons
$("#add-gify").on("click", function (event) {
  event.preventDefault();

  //Stores user input from the textbox
  var gify = $("#gify-input").val().trim();

  //Removes previous giphys on.click
  $("gif").empty();

  //Adds Users input from the textbox to array
  gifys.push(gify);

  //Calls renderButtons function for User input buttons
  renderButtons();
});

function imageChangeState() {          

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if(state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if(state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }   
}



//Adds a click event listener to elements with a class of "gify"
$(document).on("click", ".gify", displayGifInfo);

//Calls the renderButtons function for the intial buttons as defined in the array
renderButtons();
