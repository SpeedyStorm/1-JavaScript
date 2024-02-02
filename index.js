import {getData} from "./getData.js";

let nbPage = 1;
let buttonPage = document.getElementById("button-page")
buttonPage.addEventListener("click", plus1Page)
getTrendMovies()

function plus1Page() {
	nbPage ++;
	getTrendMovies()
}

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