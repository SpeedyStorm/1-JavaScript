import {getData} from "./getData.js"
import { postDataRating, postDataSession } from "./postData.js"

let lienConnexion = document.querySelector(".lien-connexion")
let sessionId
let urlSansRequestToken = window.location.origin + window.location.pathname
let idMovie = new URLSearchParams(window.location.search).get('id')
if (idMovie != null) {
	urlSansRequestToken += "?id=" + idMovie}

export function Initialisation() {
	if (localStorage.getItem("sessionId") == "undefined" || localStorage.getItem("sessionId") == undefined) {
		let requestToken = new URLSearchParams(window.location.search).get('request_token') //Je regarde si l'utilisateur c'est déjà connecter auparavant
		lienConnexion.textContent = "SE CONNECTER"
		lienConnexion.addEventListener('mouseover', (e) => { //Je ne crée le token pour s'identifier que quand l'utilisateur souhaite se co
			authentification()})
		if (requestToken != null) {
			getSessionId(requestToken)}}
	else {
		sessionId = localStorage.getItem("sessionId")
		renderDisconnect()}
}

function authentification() { //Créé le bon url pour se connecter
		getData("https://api.themoviedb.org/3/authentication/token/new")
		.then((requestToken) => {
			lienConnexion.setAttribute("href", `https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${urlSansRequestToken}`)
		})
		.catch((error) => {
			alert("La requête n'a pas abouti")
		})
}

function getSessionId(requestToken) { //Et une fois que c'est fait on demande l'id de session
	postDataSession(requestToken)
		.then((dataSession) => {
			sessionId = dataSession.session_id
			localStorage.setItem("sessionId", sessionId)
			window.location.href = urlSansRequestToken
		})
		.catch((error) => {
			alert("La requête n'a pas abouti")
		})
}

function renderDisconnect() {
	if (localStorage.getItem("sessionId") != "undefined" && localStorage.getItem("sessionId") != undefined) {
		lienConnexion.textContent = "Déconnexion"}
		disconnection()
}

function disconnection() {
	lienConnexion.addEventListener('click', (e) => {
		const options = {
			method: 'DELETE',
			headers: {
			  accept: 'application/json',
			  'content-type': 'application/json',
			  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2U0ZWY3NWM3ZGRkMDYzMDUwMDgyOTUyZDUyYzU2MyIsInN1YiI6IjY1YjIxODk5MWM2MzI5MDE2YjkzNWM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8GldhwVDjEYFE1AFTzvQEk2hTaMmUANTWFBcZnvuYg'
			},
			body: JSON.stringify({session_id: sessionId})
		  };
		  
		  fetch('https://api.themoviedb.org/3/authentication/session', options)
			.then(response => response.json())
			.catch(err => console.error(err));
		localStorage.removeItem('sessionId')
		window.location.href = window.location.search
		});
}