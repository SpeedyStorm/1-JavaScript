export async function getData(url, methodUse = 'GET') {
    const options = {
      	method: methodUse,
      	headers: {
        	accept: "application/json",
        	Authorization:
        	"Mettre la clé d'API ici",
      	},
    };
  
    const data = await fetch(url, options);
    const response = await data.json();
    const movieList = response;
    return movieList;
}
