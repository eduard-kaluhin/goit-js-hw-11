import axios from 'axios';

export async function findImages(name, perPage, page) {
  const baseUrl = 'https://pixabay.com/api/';
  const apiKey = '37398613-53a7a48ec351839bec483185f';
  const auxiliaryUrl = '&image_type=photo&orientation=horizontal&safesearch=true';
  
  const response = await axios.get(`${baseUrl}?key=${apiKey}&q=${name}${auxiliaryUrl}&per_page=${perPage}&page=${page}`);
  
  return response;
}