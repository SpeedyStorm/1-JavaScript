import {getData} from "./getData.js";
import { Initialisation } from "./authentification.js";

Initialisation()

const searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
})

const list = document.querySelector("#movie-list");
const input = document.querySelector("#input");
let nbPage = 1
let nameMovie

input.addEventListener("keyup", (e) => {
    nameMovie = e.target.value
    getmovieSearch(nameMovie, true);
});

function getmovieSearch(nameMovie, wantRemove) {
    getData(`https://api.themoviedb.org/3/search/movie?query=${nameMovie}&include_adult=false&language=fr&page=${nbPage}`)
    .then((movieList) => {
        render(movieList.results, wantRemove)
    })
    .catch((error) => {
        console.log(error)
        alert("La requête n'a pas aboutiiiii")
  	})
}

function renderRemove() {
    const elementsToRemove = list.querySelectorAll("li")
    elementsToRemove.forEach((element) => {
        list.removeChild(element);
    });
}

function render(movieList, wantRemove) {
    const messageRemove = document.getElementById("messageNoResult")
    if (wantRemove == true) {
        renderRemove()}
    if (messageRemove != null) {
        document.querySelector("main").removeChild(messageRemove)
    }
    if (movieList.length == 0) {
        const messageNoResult = document.createElement("p")
        messageNoResult.setAttribute('id', "messageNoResult")
		messageNoResult.textContent = "Aucun résultat" 
        document.querySelector("main").appendChild(messageNoResult)
    }
    else {
        movieList.forEach((movieObject) => {
            const item = document.createElement("li")

            const itemTitle = document.createElement("h3")
            itemTitle.textContent = movieObject.title

            const imgDOM = document.createElement("img")
            const imgUrl = "https://image.tmdb.org/t/p/w1280" + movieObject.poster_path
            imgDOM.setAttribute('src', imgUrl)
            
            const lien = document.createElement("a")
		    lien.setAttribute('href', `movie.html?id=${movieObject.id}`)

            lien.appendChild(imgDOM)
            lien.appendChild(itemTitle)
            item.appendChild(lien)

            list?.appendChild(item);
        });
    }
}

window.addEventListener("scroll", (e) => {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const scrolledDistance = window.scrollY;

	if (scrolledDistance >= scrollableHeight * 0.99) {
		nbPage ++;
		getmovieSearch(nameMovie, false);
        setTimeout((e), 1000)
	}
})