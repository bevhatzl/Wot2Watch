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

        $("#movie-title1").text(response.results[0].title);
        $("#year1").text(response.results[0].release_date);
        $("#plot1").text(response.results[0].overview);
        $("#image1").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[0].poster_path);

        $("#movie-title2").text(response.results[1].title);
        $("#year2").text(response.results[1].release_date);
        $("#plot2").text(response.results[1].overview);
        $("#image2").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[1].poster_path);

        $("#movie-title3").text(response.results[2].title);
        $("#year3").text(response.results[2].release_date);
        $("#plot3").text(response.results[2].overview);
        $("#image3").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[2].poster_path);

        $("#movie-title4").text(response.results[3].title);
        $("#year4").text(response.results[3].release_date);
        $("#plot4").text(response.results[3].overview);
        $("#image4").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[3].poster_path);

        $("#movie-title5").text(response.results[4].title);
        $("#year5").text(response.results[4].release_date);
        $("#plot5").text(response.results[4].overview);
        $("#image5").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[4].poster_path);

        $("#movie-title6").text(response.results[5].title);
        $("#year6").text(response.results[5].release_date);
        $("#plot6").text(response.results[5].overview);
        $("#image6").attr("src", "http://image.tmdb.org/t/p/w185//" + response.results[5].poster_path);
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