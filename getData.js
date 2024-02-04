export async function getData(url, methodUse = 'GET') {
    const options = {
      	method: methodUse,
      	headers: {
        	accept: "application/json",
        	Authorization:
        	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2U0ZWY3NWM3ZGRkMDYzMDUwMDgyOTUyZDUyYzU2MyIsInN1YiI6IjY1YjIxODk5MWM2MzI5MDE2YjkzNWM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8GldhwVDjEYFE1AFTzvQEk2hTaMmUANTWFBcZnvuYg",
      	},
    };
  
    const data = await fetch(url, options);
    const response = await data.json();
    const movieList = response;
    return movieList;
}