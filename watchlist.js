const key = "548509d1";
const resultListEl = document.querySelector(".result__list");
let watchlistArray = [];



const renderMovie = (imdbID) => {

    fetch(`https://www.omdbapi.com/?apiKey=${key}&i=${imdbID}`)
        .then(res => res.json())
        .then(data => {
            const { Title, imdbRating, Runtime, Genre, Plot, Poster } = data;
            let watchlistHTML = watchlistArray.includes(imdbID) ? "Remove from Watchlist ❌" : "Add to Watchlist ✅";
            resultListEl.innerHTML += `
                                            <div class="result" id="${imdbID}">
                                            <div class="img-div"><img class="result__img" src="${Poster}" alt="${Title}-poster"></div>
                                            <div class="result__info">
                                                <div class="result__info__header">
                                                    <h4 class="result__info__header__moviename">${Title}</h4>
                                                    <span class="result__info__header__rating">⭐${imdbRating}</span>
                                                </div>
                                                <div class="result__info__details">
                                                    <span class="result__info__details__duration">${Runtime}</span>
                                                    <span class="result__info__details__genre">${Genre}</span>
                                                    <span class="watchlist-label">${watchlistHTML}</span>
                                                </div>
                                                <div class="result__info__description">
                                                    <p>${Plot}</p>
                                                </div>
                                            </div>
                                        `
        })

}
function handleAddRemove() {
    resultListEl.addEventListener("click", e => {
        // If clicked on the "add to watchlist " button.
        if (e.target.matches(".watchlist-label")) {
            // Fetch movieID from e.target.
            let movieID = e.target.closest(".result").id;
            // If the movie is a part of the watchlist
            if (watchlistArray.includes(movieID)) {
                // Remove the item from array and display add button.
                watchlistArray = watchlistArray.filter(id => id !== movieID)
                e.target.textContent = "Add to Watchlist ✅"
            } else {
                // Add item to the array, and display remove button.
                watchlistArray.push(movieID)
                e.target.textContent = "Remove from Watchlist❌"
            }
            // Update the localstorage data with the change made.
            localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
            resultListEl.textContent = null;
            if (watchlistArray.length) {
                watchlistArray.forEach(mov => {
                    renderMovie(mov);
                })
            } else {
                resultListEl.innerHTML = `
                                        <div class="default">
                                        <h3>Your watchlist is looking a little empty...</h3>
                                        <div class="explore"> <a href="index.html">🎬 Let's add some movies! 🍿</a></div>
                                        </div>
                                        `
            }
        }
    })
}
handleAddRemove()

const updateWatchlist = _ => {
    if (JSON.parse(localStorage.getItem("watchlist")).length) {
        watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
        resultListEl.innerHTML = null;
        watchlistArray.forEach(movie => {
            renderMovie(movie)
        })

    }
}
updateWatchlist()