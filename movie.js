import {getData} from "./getData.js";

const divContainer = document.querySelector(".container")

document.addEventListener('DOMContentLoaded', (e) => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    getmovieId(movieId)
});

function getmovieId(movieId) {
    getData(`https://api.themoviedb.org/3/movie/${movieId}?language=fr`)
    .then((movie) => {
        console.log(movie)
        render(movie)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

function render(movie) {
    const itemTitle = document.createElement("h3")
    itemTitle.textContent = movie.title

    const imgDOM = document.createElement("img")
    const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    imgDOM.setAttribute('src', imgUrl)

    const resume = document.createElement("p")
    resume.textContent = movie.overview

    divContainer.appendChild(imgDOM)
    divContainer.appendChild(itemTitle)
    divContainer.appendChild(resume)
}