// var movieSearch = document.querySelector('.movieSearch-form');

// const {
//     INIT_TEMPLATE_FILE
// } = require("snowpack/lib/cjs/util");

var movieList = {};

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
            // var i = 0;
            // data.results.forEach(function (item) {
            //     movieList = {
            //         title: item.title,
            //         poster: item.image,
            //     }
            //     localStorage.setItem("movieResults" + [i], JSON.stringify(movieList));
            //     })
            //     console.log(movieList);
        })
};


document.querySelector('.movieSearch-form').addEventListener('submit', movieLookup);