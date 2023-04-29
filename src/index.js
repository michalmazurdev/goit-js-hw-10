import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
function renderCountries(data) {
  if (data.length === 1) {
    let country = data[0];
    let languages = Object.values(country.languages).join(', ');
    countryInfoEl.innerHTML = `<h2><img height=36 src=${country.flags.svg} alt='Flag of ${country.name.official}'>${country.name.official}</h2>
    <ul>
      <li><b>Capital:</b> ${country.capital}</li>
      <li><b>Population:</b> ${country.population}</li>
      <li><b>Languages:</b> ${languages}</li>
    </ul>`;
  } else if (data.length > 1 && data.length < 11) {
    let markup = ``;
    for (let country of data) {
      markup += `<li><img height=19px src=${country.flags.svg} alt='Flag of ${country.name.official}'>${country.name.official}</li>`;
      listEl.innerHTML = markup;
    }
  } else {
    Notify.info('Too many matches found. Please enter a more spcific name.');
  }
}

inputEl.addEventListener(
  'input',
  debounce(event => {
    countryInfoEl.innerHTML = '';
    listEl.innerHTML = '';
    fetchCountries(event.target.value.trim())
      .then(data => {
        renderCountries(data);
      })
      .catch(error => {
        if (event.target.value === '') {
          return;
        } else {
          Notify.failure('Oops, there is no country with that name');
        }
      });
  }, DEBOUNCE_DELAY)
);
