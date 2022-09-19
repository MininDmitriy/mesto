export default class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  getInfoAboutProfile() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так с загрузкой информации о пользователе с сервера: ${res.status}`);
    });
  }

  getInfoAboutCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так с загрузкой карточек с сервера: ${res.status}`);
    });
  }

  changeProfile(newName, newInfo) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newName}`,
        about: `${newInfo}`
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так со сменой имени и профессии пользователя: ${res.status}`);
    });
  }

  changeAvatar(avatarNew) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarNew}`,
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так со сменой аватара пользователя: ${res.status}`);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так с добавлением новой карточки: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так с удалением карточки пользователя: ${res.status}`);
    });
  }

  deleteLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так с удалением лайка с карточки: ${res.status}`);
    });
  }

  addLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Что-то пошло не так с добавлением лакйка карточки: ${res.status}`);
    });
  }
}