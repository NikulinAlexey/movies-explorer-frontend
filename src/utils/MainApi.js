// const BASE_URL = 'https://alekseyNikulin-graduate-b.nomoreparties.co';
const BASE_URL = 'http://localhost:3001';
const credentials = 'include';
const headers = {
  'Content-Type': 'application/json',
};

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function register({name, email, password}) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
    credentials,
  })
    .then(checkResponse)
};
export function authorize({email, password}) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
    credentials,
  })
    .then(checkResponse)
};

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
    credentials,
  })
    .then(checkResponse)
}

export function signOut() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    headers,
    credentials,
  })
    .then(checkResponse)
};

export function likeMovie({
  year,
  image,
  nameEN,
  nameRU,
  duration,
  country,
  id,
  director,
  thumbnail,
  description,
  trailerLink,
}) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      image: `https://api.nomoreparties.co${image.url}`,
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      thumbnail: `https://api.nomoreparties.co${image.url}`,
      id,
      nameRU,
      nameEN,
    }),
    credentials,
  })
    .then(checkResponse)
}

export function deleteMovie(movieId) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers,
    credentials,
  })
    .then(checkResponse)
}


export function updateProfile(name, email) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({name, email}),
    credentials,
  })
    .then(checkResponse)
}

export function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers,
    credentials,
  })
    .then(checkResponse)
}