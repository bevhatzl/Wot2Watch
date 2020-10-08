$(document).ready(function () {

    const apiKey = "8b62510912a7383c1b19590d2a74d5c1";
    let seriesPageNum;
    let seriesGenreID = 0;

    // To convert the genre to a genreID needed for api search
    function getGenre(genreString) {
        switch (genreString) {
            case "Action &amp; Adventure":
                genreID = 10759;
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
            case "Kids":
                genreID = 10762;
                break;
            case "Mystery":
                genreID = 9648;
                break;
            case "News":
                genreID = 10763;
                break;
            case "Reality":
                genreID = 10764;
                break;
            case "Sci-Fi & Fantasy":
                genreID = 10765;
                break;
            case "Soap":
                genreID = 10766;
                break;
            case "Talk":
                genreID = 10767;
                break;
            case "War & Politics":
                genreID = 10768;
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
        $(".seriesCarosel").css("display", "none");
        // Display the movie poster cards
        $("#series-results").css("display", "flex");
        // Calculate which response index to display given the current results page number
        let maxVal = seriesPageNum * 10;
        let minVal = maxVal - 10;
        // Check if any more results from api
        if (response.results[minVal] !== undefined) {
            // Clear any series from previous display
            $("#series-results").html("");
            // Retrieve 10 results from the api response, create the html dynamically and append to search results
            for (i = minVal; i < maxVal; i++) {
                // Create the series holder element and card
                let mHolder = $('<div class="movieHolder m-2 col-lg-5">');
                let genreCard = $('<div class="card genre-card">');
                let cardBody = $('<div class="card-body">');
                // Get the series data, setup the element 
                cardBody.append('<h5 class="card-title" id="series-title" + i>' + response.results[i].name + '</h5>');
                cardBody.append('<p class="card-text" id="series-year" + i>' + response.results[i].first_air_date + '</p>');
                cardBody.append('<p class="card-text" id="series-plot" + i>' + response.results[i].overview + '</p>');
                // For the series poster image
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
                $("#series-results").append(mHolder);
                // Display the more results button
                $("#more-btn").css("display", "block");
            }
        } else {
            $("#series-error-display").css("display", "block");
        }
    }

    function buildQueryURL(genreSearch) {
        let queryURL = "https://api.themoviedb.org/3/discover/tv?api_key="
        return queryURL + apiKey + "&language=en-US&sort_by=popularity.desc&with_genres=" + genreSearch;
    }

    function getSeriesData(genreSearch) {
        // Build the query URL for the ajax request to The Movie DB
        let queryURL = buildQueryURL(genreSearch);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            renderResults(response);
        });
    }

    $(document).on("click", "#series-menu a", function (event) {
        event.preventDefault();
        $("#series-error-display").css("display", "none");
        seriesPageNum = 1;
        let seriesOption = $(this).html();
        seriesGenreID = getGenre(seriesOption);
        console.log(seriesOption);
        console.log(seriesGenreID);
        getSeriesData(seriesGenreID);
    })

    $(document).on("click", "#more-btn", function (event) {
        event.preventDefault();
        seriesPageNum++;
        getSeriesData(genreID);
        // Set the focus to the top of the page
        window.location = '#';
    })


})