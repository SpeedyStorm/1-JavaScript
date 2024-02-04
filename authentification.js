import {getData} from "./getData.js";

export function authentification() {
    getData("https://api.themoviedb.org/3/authentication/token/new")
    .then((requestToken) => {
        const lienConnexion = document.querySelector(".lien-connexion")
        lienConnexion.setAttribute("href", `https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${window.location.href}`)
    })
    .catch((error) => {
        alert("La requête n'a pas abouti")
  	})
}

export async function createSessionId(requestToken) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2U0ZWY3NWM3ZGRkMDYzMDUwMDgyOTUyZDUyYzU2MyIsInN1YiI6IjY1YjIxODk5MWM2MzI5MDE2YjkzNWM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8GldhwVDjEYFE1AFTzvQEk2hTaMmUANTWFBcZnvuYg'
        },
        body: JSON.stringify({request_token: requestToken})
      };
      
      const data = await fetch('https://api.themoviedb.org/3/authentication/session/new', options)
      return data.json()
}