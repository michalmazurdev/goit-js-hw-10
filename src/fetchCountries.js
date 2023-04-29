const API_URL = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(name) {
  return fetch(
    `${API_URL}${name}?fields=name,capital,population,flags,population,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
