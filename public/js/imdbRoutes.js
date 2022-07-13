// var movieSearch = document.querySelector('.movieSearch-form');

// const {
//     INIT_TEMPLATE_FILE
// } = require("snowpack/lib/cjs/util");

var movieList = [];
var movieListStringified = [];
var movieInfo;

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
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button class="btn search-btn" id="btn-${i}" type="submit">Select Movie</button>
                    </div>
                </div>
                `
                document.querySelector("#displayMovieResults").append(movieSearchList);

            }
            var movieParent = document.querySelector('#displayMovieResults');
            movieParent.onclick = function (e) {
                console.log("CLICKED");
                let target = e.target;
                // movieInfo = target.parentElement.parentElement;
                var imdb = document.querySelector('.imdbid').innerHTML;
                console.log(imdb);
                if (target.className != 'btn search-btn') return;
                console.log(target.className);
                // if (target.class != 'seperatePosters') return;
                highlight(target);
            };

            function highlight(highlightMovie) {
                selectedMovie = highlightMovie;
                console.log(movieInfo);
                selectedMovie.classList.add('highlight')
            }

        })
};


document.querySelector('.movieSearch-form').addEventListener('submit', movieLookup);