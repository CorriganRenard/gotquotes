// I wanted to do this without jquery in case I port it over to react in the future.

var newQuote = document.getElementById("new-quote");
var tweetQuote = document.getElementById("tweet-quote");
var quote = document.getElementById("quote");
var author = document.getElementById("author");

//function to open twitter for tweet function
function openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
}

ready(function() {

    getQuote();

    //get quote from GOT Quotes API
    function getQuote() {
        var request = new XMLHttpRequest();
        request.open("GET", "https://got-quotes.herokuapp.com/quotes", true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                //Success!
                var quoteBody = JSON.parse(request.responseText);
                currentQuote = quoteBody.quote;
                currentAuthor = quoteBody.character;
                quote.textContent = currentQuote;
                author.textContent = currentAuthor;
            } else {
                // we reached our target server but it returned an error
                console.log("error pulling data")
            }
        };
        request.onerror = function() {
            //there was an error of some sort
        };
        request.send();
    }
    // Open twitter and populate form with quote data
    function tweet() {

        openURL('https://twitter.com/intent/tweet?hashtags=quotes&text='
            + encodeURIComponent('"' + currentQuote + '" -' + currentAuthor));

        /* todo:
            1. add full twitter api for tweeting a quote without having to use twitter gui
         */

    }
    //event listeners for click events (new quote and tweet quote)
    newQuote.addEventListener("click", getQuote);
    tweetQuote.addEventListener("click", tweet);
});
// document ready function
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);

    }
}


