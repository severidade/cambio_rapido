const coinsTitle = document.querySelector('#coins-title');
const coinsListElement = document.querySelector('#quote');
const listOfCurrencies = document.querySelector('#currencieSelect');
const DECIMAL = 2;

export function createCoinsElement(name, value) {
  const coinEl = document.createElement('li');
  const icon = document.createElement('img');
  icon.src = '../../img/icons/coin.png';

  coinEl.innerHTML = `
    <figure>${icon.outerHTML}</figure>
    <span>${name}</span>
    <span>${value}</span>
  `;

  coinEl.classList.add('coin_quote');

  return coinEl;
}

export function renderCoins(baseCoin, coins) {
  coinsTitle.innerHTML = `Valores base a 1 ${baseCoin}`;
  coinsListElement.innerHTML = '';

  coins.forEach((coin) => {
    const coinEl = createCoinsElement(coin.name, (coin.value).toFixed(DECIMAL));
    coinsListElement.appendChild(coinEl);
    console.log(coinEl);
  });
}

export function createCoinSelect(name) {
  const selectEl = document.createElement('option');

  selectEl.innerHTML = `${name}`;
  selectEl.value = `${name}`;
  return selectEl;
}

export function renderCoinSelect(currencies) {
  listOfCurrencies.innerHTML = '';

  currencies.forEach((currencie, index) => {
    const selectItem = createCoinSelect(currencie.name);
    listOfCurrencies.appendChild(selectItem);

    // Adiciona o atributo 'selected' se for o primeiro item
    if (index === 0) {
      selectItem.setAttribute('selected', 'selected');
    }
  });
}
