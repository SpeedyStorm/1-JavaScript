import {getData} from "./getData.js";
import {Initialisation} from "./authentification.js";
import {idAlea} from "./alea.js";

let nbPage = 1
getTrendMovies()
Initialisation()
idAlea()

function getTrendMovies() {
	getData(`https://api.themoviedb.org/3/movie/popular?language=fr-US&page=${nbPage}`) // Récupère la liste des films en tendances
    .then((moviesList) => {
        render(moviesList.results)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

function render(movieList) {
	const list = document.querySelector("#movie-list");

  	movieList.forEach((movieObject) => { //Pour chaque film, je récupère les infos qui m'intéresse et les mets dans le DOM
    	const item = document.createElement("li")

    	const itemTitle = document.createElement("h3")
    	itemTitle.textContent = movieObject.title

    	const imgDOM = document.createElement("img")
    	const imgUrl = "https://image.tmdb.org/t/p/w1280" + movieObject.poster_path
    	imgDOM.setAttribute('src', imgUrl)
		
		const dateSortie = document.createElement("p")
		dateSortie.textContent = `${movieObject.release_date.slice(8, 10)}/${movieObject.release_date.slice(5, 7)}/${movieObject.release_date.slice(0, 4)}` //Heure version fr

		const lien = document.createElement("a")
		lien.setAttribute('href', `movie.html?id=${movieObject.id}`) //L'id du film est dans les paramètres d'url pour le récup sur la nouvelle page

		lien.appendChild(imgDOM)
    	lien.appendChild(itemTitle)
		lien.appendChild(dateSortie)
		item.appendChild(lien)

    	list?.appendChild(item);
  	});
}

window.addEventListener("scroll", (e) => {
	const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight; //Je récupère la taille de la page et où en est le scroll actuel pour savoir si je suis en bas
	const scrolledDistance = window.scrollY;

	if (scrolledDistance >= scrollableHeight * 0.90) {
		nbPage ++
		getTrendMovies()
		setTimeout((e), 1000)
	}
})