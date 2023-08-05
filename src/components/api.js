<<<<<<< HEAD
<<<<<<< HEAD
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
=======
=======
>>>>>>> parent of f9d04e3 (Исправления 1)
import { nameInput, jobInput } from '../components/utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'c647b017-72a1-4b0d-aa7e-3955d3146485',
    'Content-Type': 'application/json'
>>>>>>> parent of f9d04e3 (Исправления 1)
  }

  _getCheckResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

<<<<<<< HEAD
  profileUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getCheckResponseData)
  }

  getUserCard = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getCheckResponseData)
  }

  sendUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._getCheckResponseData)
  }

  refreshAvatar(photo) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: photo,
      })
    })
      .then(this._getCheckResponseData)
  };

  sendCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._getCheckResponseData)
  }

  putLikeCard = (userCardsId) => {
    return fetch(`${this._baseUrl}/cards/likes/${userCardsId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getCheckResponseData)
  }

  deleteLikeCard = (userCardsId) => {
    return fetch(`${this._baseUrl}/cards/likes/${userCardsId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getCheckResponseData)
  }

  deleteCard = (userCardsId) => {
    return fetch(`${this._baseUrl}/cards/${userCardsId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getCheckResponseData)
  }
=======
export const profileUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getCheckResponseData)
    .then(data => data);
}

export const getUserCards = (addCard, fragmentUserCards) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(getCheckResponseData)
    .then(cards => cards);
}

export const sendUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then(getCheckResponseData)
    .then(data => data);
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
// загрузка карточек на сервер
export const installCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getCheckResponseData);
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
    .then(data => data);
}
// Отправить лайк карточки на сервер
export const putLikeCard = (userCardsId) => {
  return fetch(`${config.baseUrl}/cards/likes/${userCardsId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getCheckResponseData)
    .then(data => data);
}
// удалить лайк
export const deliteLikeCard = (userCardsId) => {
  return fetch(`${config.baseUrl}/cards/likes/${userCardsId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getCheckResponseData)
    .then(data => data);
}
// удалить карточку
export const deleteCard = (userCardsId, cardParts) => {
  return fetch(`${config.baseUrl}/cards/${userCardsId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getCheckResponseData)
>>>>>>> parent of f9d04e3 (Исправления 1)
}