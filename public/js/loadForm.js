document.querySelector(".loadPoster").onload = generateMoviePoster(localStorage.getItem('selectedMovie'));

var title;

function generateMoviePoster(retrieved) {
    console.log("new movie poster");
    console.log(retrieved);
    fetch(`https://imdb-api.com/en/API/Title/k_df1r50ia/${retrieved}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            moviePoster = data.image
            title = data.fullTitle
            console.log(title);

            var singlePoster = document.createElement('div');
            console.log(moviePoster);
            singlePoster.innerHTML =
                `
            <div class="singlePoster">
            <img class="card-img posterImage" src="${moviePoster}"</img>

            `
            document.querySelector("#posterContainer").append(singlePoster);
        })
}