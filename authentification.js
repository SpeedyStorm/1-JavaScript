import {getData} from "./getData.js";

export async function authentification() {
    getData("https://api.themoviedb.org/3/authentication/token/new")
    .then((requestToken) => {
        const lienConnexion = document.querySelector(".lien-connexion")
        lienConnexion.setAttribute("href", `https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${window.location.href}`)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}