const API_URL = 'https://rickandmortyapi.com/api/character';

const getData = (filter: string = '') => {
  return fetch(`${API_URL}${filter ? `/?name=${filter}` : ''}`)
    .then((res) => res.json())
    .then((result) => result.results)
    .catch((error) => error);
};

export default getData;
