export async function postDataRating(movieId, ratingValue) {
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: "Mettre la clé d'API ici"
    },
    body: `{"value":${ratingValue}}`
  };
  
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${localStorage.getItem("sessionId")}`, options)
        .then(response => response.json())
        .catch(err => console.error(err))}

export async function postDataSession(requestToken) {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: "Mettre la clé d'API ici"
        },
        body: JSON.stringify({request_token: requestToken})
    };
    const data = await fetch('https://api.themoviedb.org/3/authentication/session/new', options)
    return data.json()}
