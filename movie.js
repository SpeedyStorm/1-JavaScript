import {getData} from "./getData.js"
import {postDataRating} from "./postData.js"
import {Initialisation} from "./authentification.js"
import { idAlea } from "./alea.js"

Initialisation()
idAlea()

const divContainerMovie = document.querySelector(".container-film")
const divContainerReviews = document.querySelector(".container-reviews")

let UtilisateurCo = false
if (localStorage.getItem("sessionId") != "undefined" && localStorage.getItem("sessionId") != undefined) {
    UtilisateurCo = true}

const movieId = new URLSearchParams(window.location.search).get('id')
if (movieId == null) {
    alert("Oups, vous n'auriez pas du atterir ici...")}
else {
    getmovieId(movieId)
    getReview(movieId, "fr")}

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
            if (langue == "fr"){
                getReview(movieId, "en")}
            else {
               const MessageNoReview = document.createElement("h4")
               MessageNoReview.setAttribute("class", "message")
                MessageNoReview.textContent = "Personne n'a écrit de commentaire."
                divContainerReviews.appendChild(MessageNoReview)
            }
        }
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

function renderMovie(movie) {
    document.title = "AmbiFilm - " + movie.title

    const itemTitle = document.createElement("h3")
    itemTitle.textContent = movie.title

    const imgDOM = document.createElement("img")
    const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    imgDOM.setAttribute('src', imgUrl)

    const resume = document.createElement("p")
    resume.textContent = "Synopsis : " + movie.overview

    const duree = document.createElement("p")
    if (movie.runtime != 0){
    duree.textContent = `Durée : ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}

    const dateDeSortie = document.createElement("p")
    if (movie.release_date != ""){
        dateDeSortie.textContent = `Date de sortie : ${movie.release_date.slice(8, 10)}/${movie.release_date.slice(5, 7)}/${movie.release_date.slice(0, 4)}`}

    const genre = document.createElement("p")
    movie.genres.forEach((movieGenre) => {
        genre.textContent += movieGenre.name + ", "
    })
    genre.textContent = genre.textContent.slice(0, -2)

    const textRating = document.createElement("p")
    textRating.textContent = "Connecter-vous pour laisser une note"
    const inputRating = document.createElement("input")
    inputRating.setAttribute("type", "text")
    inputRating.setAttribute("placeholder", "8.5")
    const buttonRating = document.createElement("button")
    buttonRating.textContent = "Valider"

    buttonRating.addEventListener('click', (e) => {
        postDataRating(movieId, inputRating.value)});
        inputRating.value = ""

    divContainerMovie.appendChild(imgDOM)
    const MovieContenu = document.createElement("div")
    MovieContenu.setAttribute("id", "movie-contenu")
    MovieContenu.appendChild(itemTitle)
    MovieContenu.appendChild(genre)
    MovieContenu.appendChild(duree)
    MovieContenu.appendChild(dateDeSortie)
    MovieContenu.appendChild(resume)
    if (UtilisateurCo == true) {
        textRating.textContent = "Laisser une note sur 10 ?"
        MovieContenu.appendChild(textRating)
        MovieContenu.appendChild(inputRating)
        MovieContenu.appendChild(buttonRating)}
    else {MovieContenu.appendChild(textRating)}
    divContainerMovie.appendChild(MovieContenu)
}

function renderReviews(listeReview, langue) {
    let MessageNoFr;
    if (langue == "en") {
        MessageNoFr = document.createElement("h4")
        MessageNoFr.setAttribute("class", "message")
        MessageNoFr.textContent = "Il n'y a pas de commentaires en français pour ce film donc d'autres en anglais sont chargées à leurs places."
        divContainerReviews.appendChild(MessageNoFr)
    }

    listeReview.forEach((review) => {
        const divOneReview = document.createElement("div") 
        divOneReview.setAttribute("class", "one-review")

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
        nameAuthor.setAttribute("class", "name-author")
        nameAuthor.textContent = review.author

        const datePubli = document.createElement("p")
        datePubli.textContent = `${review.created_at.slice(8,10)}/${review.created_at.slice(5,7)}/${review.created_at.slice(0,4)} à ${review.created_at.slice(11,16)}`

        const contentReview = document.createElement("p")
        contentReview.textContent = review.content.replace(/\*\*/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '')
        contentReview.setAttribute("id", "resume")

        const authorContent = document.createElement("div")
        authorContent.setAttribute("id", "author-content")
        authorContent.appendChild(pictureAuthor)
        authorContent.appendChild(nameAuthor)
        authorContent.appendChild(datePubli)
        divOneReview.appendChild(authorContent)
        divOneReview.appendChild(contentReview)
        divContainerReviews.appendChild(divOneReview)
    })
}