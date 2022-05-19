import { apiSettings } from './settings';

const { BASE_URL, API_KEY } = apiSettings;

async function fetchImages(searchQuery, currentPage) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(`Нет покемона с именем ${searchQuery}`));
}

const api = {
  fetchImages,
};

export default api;
