export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getCheckResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

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
}
