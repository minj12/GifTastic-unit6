//Initial Array Values
var array= []
//Main variable
var gify = $(this)
var query =

//Get THAT Giphy with Ajax
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {
        var results=response.data
    }

//console
console.log(queryURL);
console.log(response)

var gifyDiv = $("<>")