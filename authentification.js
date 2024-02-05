import {getData} from "./getData.js";

let lienConnexion = document.querySelector(".lien-connexion")
let sessionId
let urlSansRequestToken = window.location.origin + window.location.pathname
let idMovie = new URLSearchParams(window.location.search).get('id')
if (idMovie != null) {
	urlSansRequestToken += "?id=" + idMovie}

export function Initialisation() {
	if (localStorage.getItem("sessionId") == "undefined" || localStorage.getItem("sessionId") == undefined) {
		let requestToken = new URLSearchParams(window.location.search).get('request_token')
		lienConnexion.textContent = "Se connecter"
		lienConnexion.addEventListener('mouseover', (e) => {
			authentification()})
		if (requestToken != null) {
			getSessionId(requestToken)}}
	else {
		sessionId = localStorage.getItem("sessionId")
		renderDisconnect()}
}

function authentification() {
		getData("https://api.themoviedb.org/3/authentication/token/new")
		.then((requestToken) => {
			lienConnexion.setAttribute("href", `https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${urlSansRequestToken}`)
		})
		.catch((error) => {
			alert("La requête n'a pas abouti")
		})
}

function getSessionId(requestToken) {
	createSessionId(requestToken)
		.then((dataSession) => {
			sessionId = dataSession.session_id
			localStorage.setItem("sessionId", sessionId)
			window.location.href = urlSansRequestToken
		})
		.catch((error) => {
				alert("La requête n'a pas abouti")
		})
}

async function createSessionId(requestToken) {
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
		Initialisation()});
}