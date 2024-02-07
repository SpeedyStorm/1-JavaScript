import {getData} from "./getData.js"

let lastId, aleaId

export async function idAlea() {
    await getData("https://api.themoviedb.org/3/movie/latest")
    .then((data) => {
        lastId = data.id
    })
    .catch((error) => {
        console.log(error)
  	})
    aleaId = Math.floor(Math.random() * (lastId - 2) + 2);
    testId()
}

async function testId() {
    await getData("https://api.themoviedb.org/3/movie/" + aleaId)
    .then((data) => {
        if (data.success == false) {
            idAlea()}
        else if (data.adult == true) {
            idAlea()}
        else {
            idFound()}
    })
    .catch((error) => {
        console.log(error)})
}

function idFound() {
    const lienDiscover = document.querySelector(".discover")
    lienDiscover.setAttribute("href", "http://127.0.0.1:5500/movie.html?id=" + aleaId)
    console.log(aleaId)
}