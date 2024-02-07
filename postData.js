export async function postDataRating(movieId, ratingValue) {
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2U0ZWY3NWM3ZGRkMDYzMDUwMDgyOTUyZDUyYzU2MyIsInN1YiI6IjY1YjIxODk5MWM2MzI5MDE2YjkzNWM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8GldhwVDjEYFE1AFTzvQEk2hTaMmUANTWFBcZnvuYg'
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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2U0ZWY3NWM3ZGRkMDYzMDUwMDgyOTUyZDUyYzU2MyIsInN1YiI6IjY1YjIxODk5MWM2MzI5MDE2YjkzNWM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8GldhwVDjEYFE1AFTzvQEk2hTaMmUANTWFBcZnvuYg'
        },
        body: JSON.stringify({request_token: requestToken})
    };
    const data = await fetch('https://api.themoviedb.org/3/authentication/session/new', options)
    return data.json()}