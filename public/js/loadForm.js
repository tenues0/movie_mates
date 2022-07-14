
var title;

function generateMoviePoster(retrieved) {
    console.log("new movie poster");
    console.log(retrieved);
    fetch(`https://imdb-api.com/en/API/Title/k_df1r50ia/${retrieved}`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            moviePoster = data.image;
            moviePlot = data.plot;
            movieTitle = data.fullTitle;
            movieDirector = data.directors;
            movieReleaseDate = data.releaseDate;
            movieStars = data.stars;
            console.log(movieTitle);

            var singlePoster = document.createElement('div');
            console.log(moviePoster);
            singlePoster.innerHTML =
                `
            <div class="singlePoster">
            <img class="card-img posterImage" src="${moviePoster}"></img>
            <div class="posterContents ml-3">
            <h3>Title:</h3>
            <p>${movieTitle}</p>
            <h4>Plot Summary:</h4>
            <p>${moviePlot}</p>
            <h5>Directed By:</h5>
            <p>${movieDirector}</p>
            <h6>Starring:</h6>
            <p>${movieStars}</p>
            <h7>Theatrical Release:</h7>
            <p>${movieReleaseDate}</p>
            </div>

            `
            document.querySelector("#posterContainer").append(singlePoster);
        })
}

document.querySelector(".loadPoster").onload = generateMoviePoster(localStorage.getItem('selectedMovie'));