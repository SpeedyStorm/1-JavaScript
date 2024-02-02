import {getData} from "./getData.js";

const searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
})

const list = document.querySelector("#list");
const input = document.querySelector("#input");
let buttonPage = document.getElementById("button-page")
buttonPage.addEventListener("click", plus1Page)
let nbPage = 1
let nameMovie

input.addEventListener("keyup", (e) => {
    nameMovie = e.target.value
    getmovieSearch(nameMovie, true);
});

function plus1Page() {
	nbPage ++;
	getmovieSearch(nameMovie, false);
}

async function getmovieSearch(movieName, wantRemove) {
    getData(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=fr&page=${nbPage}`)
    .then((movieList) => {
        render(movieList, wantRemove)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
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
        list.removeChild(messageRemove)
    }
    if (movieList.length == 0) {
        buttonPage.style.display = "none"
        const messageNoResult = document.createElement("p")
        messageNoResult.setAttribute('id', "messageNoResult")
		messageNoResult.textContent = "Aucun résultat"
        list.appendChild(messageNoResult)
    }
    else {
        buttonPage.style.display = "block"
        movieList.forEach((movieObject) => {
            const item = document.createElement("li")

            const itemTitle = document.createElement("h3")
            itemTitle.textContent = movieObject.title

            const imgDOM = document.createElement("img")
            const imgUrl = "https://image.tmdb.org/t/p/w500" + movieObject.poster_path
            imgDOM.setAttribute('src', imgUrl)
            
            const lien = document.createElement("a")
		    lien.setAttribute('href', 'movie.html')

            lien.appendChild(imgDOM)
            lien.appendChild(itemTitle)
            item.appendChild(lien)

            list?.appendChild(item);
        });
        console.log(movieList)
    }
}