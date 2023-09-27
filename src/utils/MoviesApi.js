export const BASE_URL = 'https://api.nomoreparties.co';
const headers = {
  'Content-Type': 'application/json',
};

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function getFilms() {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers,
  })
    .then(checkResponse)
}