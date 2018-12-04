$(document).ready(function() {
    var topics = ["dogs","cats","mouse","moose","duck","horse","lion","giraffe","hamster","hippo","cow","chicken","pig"];

    function renderButtons() {
        // empty buttons div to prevent duplicates
        $("#buttons").empty();
        
        for(i=0; i<topics.length; i++) {
            // create new button
            var a= $("<button>");
            // add bootstrap button class
            a.addClass("btn btn-info m-2");
            a.addClass("animal");
            // add attribute of data-name equal to the item in the array
            a.attr("data-name",topics[i]);
            
            // set button text equal to the item in the array
            a.text(topics[i]);
            // append new button to buttons div
            $("#buttons").append(a);
        }
    }
    
    // call renderButtons function
    renderButtons();

    $(document).on("click", ".animal", function (){
        $("#gifs-appear-here").empty();
        var name = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=VyuYTRAdbm5AJBZdGgpu3vX9wjnfsnit&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            var results = response.data;
            console.log(results);
            for (var i=0; i<results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gif");
                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var animalImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                // adding data-state attribute
                animalImage.attr("data-state", "still");
                // adding data-still and data-animate attributes for the pause effect
                animalImage.attr("data-still",results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate",results[i].images.fixed_height.url);
                animalImage.addClass("animal-gif");
            
                // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                gifDiv.append(animalImage);
                gifDiv.append(p);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            }
            
        })
        
        
    })
    $(document).on("click", ".animal-gif", function(){
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }  
            
    });
    
    $("#submit").on("click", function(event){
        event.preventDefault();

        var newanimal = $("#addAnimal").val().trim();
        topics.push(newanimal);
        renderButtons();
        $("#addAnimal").empty();
        $("form").trigger("reset");
    })
});

