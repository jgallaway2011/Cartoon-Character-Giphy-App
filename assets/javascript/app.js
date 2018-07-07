
var cartoons = ["SpongeBob SquarePants", "Bugs Bunny", "Homer Simpson", "Mickey Mouse", "Bart Simpson", "Charlie Brown", "Fred Flintstone", "The Grinch", "Popeye", "Wile E. Coyote", "Rocky and Bullwinkle", "Daffy Duck", "Porky Pig", "Scooby-Doo", "Shaggy", "George Jetson", "Pink Panther", "Gumby", "Underdog", "Tweety Bird", "Sylvester", "Speed Racer", "Arthur", "Yogi Bear", "Donald Duck", "Alvin the Chipmunk", "Woody Woodpecker", "Tom and Jerry", "Angelica Pickles", "Spider-Man", "Batman", "Superman", "Wonder Woman"];

for (var i = 0; i < cartoons.length; i++) {
    var cartoonText = cartoons[i];
    var cartoonButton = $("<button type=button>" + cartoonText + "</button>");
    cartoonButton.attr({
        "class": "cartoonButton",
        "cartoon": cartoonText
    });
    $("#cartoonButtons").append(cartoonButton);
}

$(".cartoonButton").on("click", function () {
    var q = $(this).attr("cartoon");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=maXU7L6ll5Y5StYmBTamSOvu5psqgeRV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < 10; i++) {
            var cartoonDiv = $("<div>");
            var cartoonP = $("<p>").text("Rating: " + results[i].rating);
            var cartoonImg = $("<img>");
            cartoonImg.attr({
                "src": results[i].images.fixed_width_still.url,
                "alt": q,
                "data-still": results[i].images.fixed_width_still.url,
                "data-animate": results[i].images.fixed_width.url,
                "data-state": "still",
                "class": "gif"
            });
            cartoonDiv.append(cartoonImg);
            cartoonDiv.append(cartoonP);
            $("#cartoons").prepend(cartoonDiv);
        }
    });
});

$(".gif").on("click", function () {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});