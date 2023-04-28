export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix';
function renderCountries(data) {
  countryInfoEl.innerHTML = '';
  listEl.innerHTML = '';
  if (data.length === 1) {
    console.log('1');
    let country = data[0];
    let languages = Object.values(country.languages).join(', ');
    countryInfoEl.innerHTML = `
    <h2><img height=36 src=${country.flags.svg} alt='Flag of ${country.name.official}'>${country.name.official}</h2>
    <ul>
      <li><b>Capital:</b> ${country.capital}</li>
      <li><b>Population:</b> ${country.population}</li>
      <li><b>Languages:</b> ${languages}</li>
    </ul>
    `;
  } else if (data.length > 1 && data.length < 11) {
    console.log('2-10');
    let markup = ``;
    for (let country of data) {
      markup += `<li><img height=19px src=${country.flags.svg} alt='Flag of ${country.name.official}'>${country.name.official}</li>`;
      listEl.innerHTML = markup;
    }
  } else {
    console.log('too many');
    Notify.info('Too many matches found. Please enter a more spcific name.');
  }
}
inputEl.addEventListener('input', event => {
  console.log(event.target.value);
  fetchCountries(event.target.value)
    .then(data => {
      console.log(data);
      renderCountries(data);
    })
    .catch(error => {
      console.log(error, 'oups, something went wrong');
      Notify.failure('Oops, there is no country with that name');
    });
});

// fetchCountries('poland')
//   .then(data => {
//     console.log(data);
//     renderCountries(data);
//   })
//   .catch(error => {
//     console.log(error, 'oups, something went wrong');
//     Notify.failure('Oops, there is no country with that name');
//   });
