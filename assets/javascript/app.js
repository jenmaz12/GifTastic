$(document).ready(function() {
    var topics = ["dogs","cats","mouse","moose","duck","horse","lion","giraffe","hamster","hippo","cow","chicken","pig"];

    function renderButtons() {
        // empty buttons div to prevent duplicates
        $("#buttons").empty();
        
        for(i=0; i<topics.length; i++) {
            // create new button
            var a= $("<button>");
            // add bootstrap button class
            a.addClass("btn btn-info mr-2");
            
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
});

