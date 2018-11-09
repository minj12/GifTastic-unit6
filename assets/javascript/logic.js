//Setting Initial Array Values
var gifys = ["Batman", "Bo Jack Horseman", "South Park", "The Simpsons", "Futurama", "Robot Chicken", "Brickleberry", "Drawn Together", "Aeon Flux", "Ren and Stimpy"];

function displayGifInfo(gifName) {

  //Main variables
  var gify = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gify + "&api_key=ED5M7CisPjLAtbyt9UiIJpQdgioBnDSz&limit=10";

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

       