$(document).ready(function () {

    const apiKey = "8b62510912a7383c1b19590d2a74d5c1";

    // To convert the genre to a genreID needed for api search
    function getGenre(genreString) {
        switch (genreString) {
            case "Action":
                genreID = 28;
                break;
            case "Adventure":
                genreID = 12;
                break;
            case "Animation":
                genreID = 16;
                break;
            case "Comedy":
                genreID = 35;
                break;
            case "Crime":
                genreID = 80;
                break;
            case "Documentary":
                genreID = 99;
                break;
            case "Drama":
                genreID = 18;
                break;
            case "Family":
                genreID = 10751;
                break;
            case "Fantasy":
                genreID = 14;
                break;
            case "History":
                genreID = 36;
                break;
            case "Horror":
                genreID = 27;
                break;
            case "Music":
                genreID = 10402;
                break;
            case "Mystery":
                genreID = 9648;
                break;
            case "Romance":
                genreID = 10749;
                break;
            case "Science Fiction":
                genreID = 878;
                break;
            case "TV Movie":
                genreID = 10770;
                break;
            case "Thriller":
                genreID = 53;
                break;
            case "War":
                genreID = 10752;
                break;
            case "Western":
                genreID = 37;
                break;
            default:
                genreID = 0;
                break;
        }
        return genreID;
    }

    function renderResults(response) {
        // Remove the home page carousel display
        $(".pictureCarosel").css("display", "none");
        // Display the movie poster cards
        $("#search-results").css("display", "flex");
        // Clear any movies from previous search
        $("#search-results").html("");


        // Retrieve the first 6 results from the api response, create the html dynamically and append to search results
        for (i = 0; i < 6; i++) {
            // Create the movie holder element and card
            let mHolder = $('<div class="movieHolder m-2 col-lg-5">');
            let genreCard = $('<div class="card genre-card">');
            let cardBody = $('<div class="card-body">');
            // Get the movie data, setup the element 
            cardBody.append('<h5 class="card-title" id="movie-title" + i>' + response.results[i].title + '</h5>');
            cardBody.append('<p class="card-text" id="year" + i>' + response.results[i].release_date + '</p>');
            cardBody.append('<p class="card-text" id="plot" + i>' + response.results[i].overview + '</p>');
            // For the movie poster image
            let imageSrc = "http://image.tmdb.org/t/p/w185//" + response.results[i].poster_path;
            let imageEl = $('<img>');
            imageEl.attr("src", imageSrc);
            // Append to the search results
            cardBody.append(imageEl);
            // Align items centered in the card
            cardBody.css("display", "flex");
            cardBody.css("flex-direction", "column");
            cardBody.css("align-items", "center");

            genreCard.append(cardBody);
            mHolder.append(genreCard);
            $("#search-results").append(mHolder);
        }
    }

    function buildQueryURL(genreSearch) {
        let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key="
        return queryURL + apiKey + "&language=en-US&sort_by=popularity.desc&with_genres=" + genreSearch;
    }

    function getMovieData(genreSearch) {
        // Build the query URL for the ajax request to The Movie DB
        let queryURL = buildQueryURL(genreSearch);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            renderResults(response);
        });
    }

    $(document).on("click", "#movie-menu a", function (event) {
        event.preventDefault();
        let movieOption = $(this).html();
        let genreID = getGenre(movieOption);
        getMovieData(genreID);
    })


})