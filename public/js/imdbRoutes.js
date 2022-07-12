// var movieSearch = document.querySelector('.movieSearch-form');

// const {
//     INIT_TEMPLATE_FILE
// } = require("snowpack/lib/cjs/util");

var movieList = [];
var movieListStringified = [];

function movieLookup(event) {
    event.preventDefault();

    const movie = document.querySelector('#searchMovie').value.trim();
    console.log("running imdb?")
    console.log(movie);
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_u4zar1it/${movie}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);

            //JIMMY note: Trying to get the movie data to create cards to show onto page
            data.results.forEach(function (item) {
                movies = {
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
                    <img class="card-img" src="${movieIndex.poster}" alt="Poster for ${movieIndex.title}">
                    <div class="card-body">
                    <h5 class="card-title">${movieIndex.title}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                `
                document.querySelector("#displayMovieResults").append(movieSearchList);

            }

        })
};


document.querySelector('.movieSearch-form').addEventListener('submit', movieLookup);