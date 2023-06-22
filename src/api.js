const apiKey = 'live_BY3WKxtAZAG7ttrgsHDxVMRZlONOFAxOxPvqVLyeFxouvDZsKdcjOS9u7Wk0hv9i';

async function makeRequest(url) {
  const response = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return makeRequest(url)
    .then(data => {
      
      return data;
    });
}
import axios from 'axios';
export {findImages};

async function findImages (name, perPg, pag) {
  const bazUrl = 'https://pixabay.com/api/';
  const keyApi = '?key=37398613-53a7a48ec351839bec483185f';
  const auxiliaryUrl =
    '&image_type=photo&orientation=horizontal&safesearch=true';
  const respons = await axios.get (
    `${bazUrl}${keyApi}&q=${name}${auxiliaryUrl}&per_page=${perPg}&page=${pag}`
  );
  return respons;
}