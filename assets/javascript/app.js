$(document).ready(function () {

    // VARIABLES
    // ***************************************************************************************************************
    
    // Array to hold the various cartoon characters
    var cartoons = ["SpongeBob SquarePants", "Bugs Bunny", "Mickey Mouse", "Charlie Brown", "Fred Flintstone", "Popeye", "Wile E. Coyote", "Rocky and Bullwinkle", "Daffy Duck", "Porky Pig", "Scooby-Doo", "George Jetson", "Pink Panther", "Gumby", "Tweety Bird", "Arthur", "Yogi Bear", "Donald Duck", "Alvin the Chipmunk", "Woody Woodpecker", "Tom and Jerry", "Angelica Pickles", "Spider-Man", "Batman", "Superman", "Wonder Woman"];

    // FUNCTIONS
    //****************************************************************************************************************

    // Function to create buttons for each cartoon character
    function cartoonButtons() {
        // Empty anything in the div with a id of cartoon-buttons
        $("#cartoon-buttons").empty();

        // Create a button for each cartoon in the array for cartoon characters
        for (var i = 0; i < cartoons.length; i++) {
            // Stores button in memory with cartoons[i] as text
            var cartoonButton = $("<button type=button>" + cartoons[i] + "</button>");
            // Adds class and cartoon attributes
            cartoonButton.attr({
                "class": "cartoonButton btn",
                "cartoon": cartoons[i],
                "data-bs-dismiss": "modal"
            });
            // Append the button to the div with a id of cartoon-buttons
            $("#cartoon-buttons").append(cartoonButton);
        }
    }

    // MAIN PROCESS
    //***************************************************************************************************************

    // Prevents code from running until page is loaded
    $(document).ready(function () {

        // Call function to create buttons
        cartoonButtons();

        // Run below code if any with a class of cartoonButton is clicked
        $(document).on('click', ".cartoonButton", function () {
            //Remove initial-p
            $("#initial-p").remove();
            // Assign value of attribute cartoon based on the element clicked to variable q
            var q = $(this).attr("cartoon");
            // Build API query link using the cartoon attribute stored in q
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=maXU7L6ll5Y5StYmBTamSOvu5psqgeRV&limit=12";

            // Pulls data from the GIPHY API using the url stored in queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
                // This code will run only after the data pull from the GIPHY API is completed
            }).then(function (response) {
                // Store results of GIPHY API pull in variable results
                var results = response.data;
                // Loop over JSON object results from GIPHY API
                for (var i = 0; i < results.length; i++) {
                    // Store a div element with class of card in variable cartoonDiv
                    var cartoonDiv = $("<div>").attr({
                        "class": "card mt-3 mr-3",
                        "style": "width: 18rem;"
                    });
                    // Store a div element with class of card-body in variable cartoonDivBody
                    var cartoonDivBody = $("<div>").attr("class", "card-body");
                    // Store a p element with text of the gif rating in variable cartoonP
                    var cartoonP = $("<p>").text("Rating: " + results[i].rating);
                    // Store a img element in variable cartoonImg
                    var cartoonImg = $("<img>");
                    // Assigns the below attributes to each image
                    cartoonImg.attr({
                        "src": results[i].images.fixed_width_still.url,
                        "alt": q,
                        "data-still": results[i].images.fixed_width_still.url,
                        "data-animate": results[i].images.fixed_width.url,
                        "data-state": "still",
                        "class": "card-img-top"
                    });
                    // Append the stored image element into the stored div
                    cartoonDiv.append(cartoonImg);
                    // Append the stored p element into the stored div
                    cartoonDivBody.append(cartoonP);
                    // Append the cartoonDivBody into the cartoonDiv
                    cartoonDiv.append(cartoonDivBody);
                    // Prepend the entire div to the div with an id of cartoons
                    $("#cartoons").prepend(cartoonDiv);
                }
                // Store a full width div to hold the Character name 
                var characterNameDiv = $("<div>").attr("class", "w-100 text-center")
                // Store Character name in H1
                var characterNameHeader = $("<h1>" + q + "</h1>").attr("class", "mt-3");
                // Append the character name header into the characterNameDiv
                characterNameDiv.append(characterNameHeader);
                // Prepend the characterNameDiv into the dive with an id of cartoons
                $("#cartoons").prepend(characterNameDiv);
            });
        });

        // Run below code if the element with id of add-cartoon is clicked
        $("#add-cartoon").on("click", function (event) {
            // Prevents the page from refreshing upon hitting submit
            event.preventDefault();
            // Extracts user input from text box
            var cartoon = $("#cartoon-input").val().trim();
            // Clear input bar
            $("#cartoon-form").children("input").val("")
            // Adds user input from text box into the cartoons array
            cartoons.push(cartoon);

            // Call function to create buttons in order to add the button for the the new addition in the array
            cartoonButtons();
            
            // Open Modal
            $("#staticBackdrop").modal("toggle");
        });

        // Run below code if any element with a class of cartoonGif is clicked
        $(document).on('click', ".card-img-top", function () {
            // Extracts the state attribue from the image clicked
            var state = $(this).attr("data-state");
            // Run this code if state for image clicked is equal to still
            if (state === "still") {
                // Change src attribute to use the animated url
                $(this).attr("src", $(this).attr("data-animate"));
                // Change data-state attribue to animate
                $(this).attr("data-state", "animate");
                // Run this code if state for image clicked is equal to animate
            } else {
                // Change src attribute to use the still url
                $(this).attr("src", $(this).attr("data-still"));
                // Change data-state attribue to still
                $(this).attr("data-state", "still");
            }
        });
    });
});