const BASE_URL = 'https://v6.exchangerate-api.com/v6/6e0f19f29fe965d988f61508/latest/';

export function fetchRates(searchedCoin) {
  return fetch(`${BASE_URL}${searchedCoin}`)
    .then((request) => request.json())
    .then((dados) => {
      if (dados.base_code !== searchedCoin) {
        console.error('Moeda não existente'); // exibe no console o erro
        throw new Error('moeda nao existente'); // interrompe p
      }
      return dados;
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}
