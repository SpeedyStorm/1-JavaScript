import {getData} from "./getData.js";
import {authentification} from "./authentification.js";

let lienHover = false
const lienConnexion = document.querySelector(".lien-connexion")
lienConnexion.addEventListener("mouseenter", (e) => {
	if (lienHover == false) {
		authentification()
		lienHover = true}})

let nbPage = 1;
getTrendMovies()

function getTrendMovies() {
	getData(`https://api.themoviedb.org/3/movie/popular?language=fr-US&page=${nbPage}`)
    .then((moviesList) => {
        render(moviesList.results)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

function render(movieList) {
	const list = document.querySelector("#movie-list");

  	movieList.forEach((movieObject) => {
    	const item = document.createElement("li")

    	const itemTitle = document.createElement("h3")
    	itemTitle.textContent = movieObject.title

    	const imgDOM = document.createElement("img")
    	const imgUrl = "https://image.tmdb.org/t/p/w500" + movieObject.poster_path
    	imgDOM.setAttribute('src', imgUrl)
		
		const dateSortie = document.createElement("p")
		dateSortie.textContent = movieObject.release_date

		const lien = document.createElement("a")
		lien.setAttribute('href', `movie.html?id=${movieObject.id}`)

		lien.appendChild(imgDOM)
    	lien.appendChild(itemTitle)
		lien.appendChild(dateSortie)
		item.appendChild(lien)

    	list?.appendChild(item);
  	});
}

window.addEventListener("scroll", (e) => {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
	const scrolledDistance = window.scrollY;

	if (scrolledDistance >= scrollableHeight * 0.99) {
		nbPage ++;
		getTrendMovies();
	}
})