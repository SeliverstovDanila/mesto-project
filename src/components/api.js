const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'c647b017-72a1-4b0d-aa7e-3955d3146485',
    'Content-Type': 'application/json'
  }
}

function getCheckResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const profileUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getCheckResponseData)
}

export const getUserCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(getCheckResponseData)
}

export const sendUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(getCheckResponseData)
}
// Изменить аватар
export function refreshAvatar(photo) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: photo,
    })
  })
    .then(getCheckResponseData)
};

// Отправить карточку на сервер
export const sendCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(getCheckResponseData)
}
// Отправить лайк карточки на сервер
export const putLikeCard = (userCardsId) => {
  return fetch(`${config.baseUrl}/cards/likes/${userCardsId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getCheckResponseData)
}
// удалить лайк
export const deleteLikeCard = (userCardsId) => {
  return fetch(`${config.baseUrl}/cards/likes/${userCardsId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getCheckResponseData)
}
// удалить карточку
export const deleteCard = (userCardsId) => {
  return fetch(`${config.baseUrl}/cards/${userCardsId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getCheckResponseData)
}