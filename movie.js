import {getData} from "./getData.js";

const divContainerMovie = document.querySelector(".container-film")
const divContainerReviews = document.querySelector(".container-reviews")

const movieId = new URLSearchParams(window.location.search).get('id')
getmovieId(movieId)
getReview(movieId, "fr")

function getmovieId(movieId) {
    getData(`https://api.themoviedb.org/3/movie/${movieId}?language=fr`)
    .then((movie) => {
        renderMovie(movie)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

function getReview(movieId, langue) {
    getData(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=${langue}&page=1'`)
    .then((reviews) => {
        if (reviews.total_results != 0) {
            renderReviews(reviews.results, langue)}
        else {
            getReview(movieId, "en")
        }
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

function renderMovie(movie) {
    const itemTitle = document.createElement("h3")
    itemTitle.textContent = movie.title

    const imgDOM = document.createElement("img")
    const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    imgDOM.setAttribute('src', imgUrl)

    const resume = document.createElement("p")
    resume.textContent = movie.overview

    const duree = document.createElement("p")
    if (movie.runtime != 0){
    duree.textContent = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}

    const dateDeSortie = document.createElement("p")
    if (movie.release_date != ""){
        dateDeSortie.textContent = `${movie.release_date.slice(8, 10)}/${movie.release_date.slice(5, 7)}/${movie.release_date.slice(0, 4)}`}

    const genre = document.createElement("p")
    movie.genres.forEach((movieGenre) => {
        genre.textContent += movieGenre.name + ", "
    })
    genre.textContent = genre.textContent.slice(0, -2)

    divContainerMovie.appendChild(imgDOM)
    divContainerMovie.appendChild(itemTitle)
    divContainerMovie.appendChild(duree)
    divContainerMovie.appendChild(dateDeSortie)
    divContainerMovie.appendChild(genre)
    divContainerMovie.appendChild(resume)
}

function renderReviews(listeReview, langue) {
    let MessageNoFr;
    if (langue == "en") {
        MessageNoFr = document.createElement("h4")
        MessageNoFr.textContent = "Il n'y a pas de commentaires en français pour ce film donc d'autres en anglais sont chargées à leurs places"
        divContainerReviews.appendChild(MessageNoFr)
    }

    listeReview.forEach((review) => {
        const divOneReview = document.createElement("div") 

        let pictureAuthor;
        if (review.author_details.avatar_path != null) {
            pictureAuthor = document.createElement("img")
            const pictureAuthorUrl = "https://image.tmdb.org/t/p/w500" + review.author_details.avatar_path
            pictureAuthor.setAttribute('src', pictureAuthorUrl)}
        else {
            pictureAuthor = document.createElement("p")
            pictureAuthor.setAttribute("class", "no-picture")
            pictureAuthor.textContent = review.author.slice(0,1)
        }

        const nameAuthor = document.createElement("p")
        nameAuthor.textContent = review.author

        const datePubli = document.createElement("p")
        datePubli.textContent = `${review.created_at.slice(8,10)}/${review.created_at.slice(5,7)}/${review.created_at.slice(0,4)} à ${review.created_at.slice(11,16)}`

        const contentReview = document.createElement("p")
        contentReview.textContent = review.content.replace(/\*\*/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '')

        divOneReview.appendChild(datePubli)
        divOneReview.appendChild(pictureAuthor)
        divOneReview.appendChild(nameAuthor)
        divOneReview.appendChild(contentReview)
        divContainerReviews.appendChild(divOneReview)
    })
}