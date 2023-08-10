export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl
    this._headers = data.headers
  }

  _getCheckResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  getUserCard = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
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

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
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

  sendCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._getCheckResponseData)
  }

  putLikeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._getCheckResponseData)
  }

  deleteLikeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getCheckResponseData)
  }
}
