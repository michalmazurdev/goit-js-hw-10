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
// fetchCountries('s')
//   .then(data => {
//     console.log(data);
//     renderCountries(data);
//   })
//   .catch(error => {
//     console.log(error, 'oups, something went wrong');
//     Notify.failure('Oops, there is no country with that name');
//   });
