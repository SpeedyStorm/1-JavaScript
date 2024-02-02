export async function getData(url) {
    const options = {
      	method: "GET",
      	headers: {
        	accept: "application/json",
        	Authorization:
        	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmI1MWU2NGJlMGYyZDMxNTVkMDY1MzhkMDIwZDY1ZSIsInN1YiI6IjY1YWZlMDE2NjdiNjEzMDBhZmYwYWExNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WUZZEs8jWJ1tRQP6qfymeUxyyTh5EpMOF1gxvRm_2MI",
      	},
    };
  
    const data = await fetch(url, options);
    const response = await data.json();
    const movieList = response.results;
    return movieList;
}