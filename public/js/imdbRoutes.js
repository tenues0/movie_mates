// var movieSearch = document.querySelector('.movieSearch-form');

// const {
//     INIT_TEMPLATE_FILE
// } = require("snowpack/lib/cjs/util");

var movieList = [];
var movieListStringified = [];
var imdb;
var singleMovie = [];
var moviePoster;

function movieLookup(event) {
    event.preventDefault();

    const movie = document.querySelector('#searchMovie').value.trim();
    console.log("running imdb?")
    console.log(movie);
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_df1r50ia/${movie}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);

            //JIMMY note: Trying to get the movie data to create cards to show onto page
            data.results.forEach(function (item) {
                movies = {
                    imdb_id: item.id,
                    title: item.title,
                    poster: item.image,
                }
                movieList.push(movies);
                // console.log("parsed movied", movieList);
                movieListStringified = JSON.stringify(movieList);
            })

            for (i = 0; i < 3; i++) {
                var movieIndex = movieList[i];
                console.log("List of movies", movieIndex.title, movieIndex.poster);
                var movieSearchList = document.createElement('div');

                movieSearchList.innerHTML = `
                <div class="seperatePosters">
                    <h6 class="imdbid">${movieIndex.imdb_id}</h6>
                    <img class="card-img" src="${movieIndex.poster}" alt="Poster for ${movieIndex.title}">
                    <div class="card-body">
                    <h5 class="card-title">${movieIndex.title}</h5>
                    <button class="btn search-btn" id="btn-${i}" type="submit">Select Movie</button>
                    </div>
                </div>
                `
                document.querySelector("#displayMovieResults").append(movieSearchList);

            }
            var movieParent = document.querySelector('#displayMovieResults');
            movieParent.onclick = function (e) {
                let target = e.target;
                // movieInfo = target.parentElement.parentElement;
                imdb = document.querySelector('.imdbid').innerHTML;
                localStorage.setItem("selectedMovie", imdb);
                if (target.className != 'btn search-btn') return;
                document.location.assign(`/api/dashboard/new`);
            };
        })
};



document.querySelector('.movieSearch-form').addEventListener('submit', movieLookup)