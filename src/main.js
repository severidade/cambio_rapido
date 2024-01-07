import './reset.css';
import './style.css';

import Swal from 'sweetalert2';
import { renderCoins, renderCoinSelect } from './components/components.js';
import { fetchRates } from './services/api.js';

// https://v6.exchangerate-api.com/v6/6e0f19f29fe965d988f61508/latest/USD

const searchBtn = document.querySelector('#search-btn');
// const coinInput = document.querySelector('#coin-input');

const listOfCurrencies = document.querySelector('#currencieSelect');

const usd = 'USD';

function handleSearch(e) {
  e.preventDefault();
  // const searchedCoin = (coinInput.value).toUpperCase();

  const selectedOption = listOfCurrencies.querySelector('option[selected="selected"]');
  const selectedCurrencyCode = selectedOption ? selectedOption.value : null;

  // if (!searchedCoin) {
  //   Swal.fire({
  //     title: 'Error',
  //     text: 'Você precisa digitar uma moeda válida',
  //     icon: 'error',
  //   });
  //   return;
  // }

  fetchRates(selectedCurrencyCode)
    .then((dados) => {
      // const { base_code, conversion_rates } = dados;

      const {
        base_code: baseCoin,
        conversion_rates: coins,
      } = dados;

      const ratesArray = Object.entries(coins);

      const ratesArrayObject = ratesArray.map((coin) => (
        {
          name: coin[0],
          value: coin[1],
        }
      ));
      renderCoins(baseCoin, ratesArrayObject);
    });
}

function handleListCurrencies(e) {
  e.preventDefault();

  fetchRates(usd)
    .then((dados) => {
      const {
        conversion_rates: coins,
      } = dados;

      const ratesArray = Object.entries(coins);

      const currencies = ratesArray.map((coin) => (
        {
          name: coin[0],
        }
      ));

      renderCoinSelect(currencies);
    });
}

function selectedCurrency() {
  const selectedItem = listOfCurrencies.value;

  // Obtém todas as opções como uma array
  const options = Array.from(listOfCurrencies.getElementsByTagName('option'));

  options.forEach((option) => {
    if (option.value === selectedItem) {
      option.setAttribute('selected', 'selected');
    } else {
      option.removeAttribute('selected');
    }
  });
}

// faz a busca
searchBtn.addEventListener('click', handleSearch);
// cria o select
document.addEventListener('DOMContentLoaded', handleListCurrencies);
// identifica o item selecionado
listOfCurrencies.addEventListener('change', selectedCurrency);
