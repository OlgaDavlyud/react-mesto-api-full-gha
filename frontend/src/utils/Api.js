class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    // Метод проверки
    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    // Запрос получения данных пользователя с сервера
    getInitialUserData() {
        return fetch (`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    // Запрос получения карточек с сервера
    getInitialCards() {
        return fetch (`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    // Запрос изменения данных пользователя
    changeUserData(data) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              name: data.name,
              about: data.about,
            })
        })
        .then(this._checkResponse);
    }

    // Запрос добавления карточки
    addCard(data) {
        return fetch (`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then(this._checkResponse);
    }

    // Запрос удаления карточки
    deleteCard(id) {
        return fetch (`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    // Запрос установки и снятия лайка
    changeLikeCardStatus(id, isLiked) {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this._headers,
        })
        .then(this._checkResponse);
    }

    // Запрос обновления аватара
    setNewAvatar(avatar) {
        return fetch (`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
    headers: {
      authorization: 'de2e08e4-c231-4ebe-acd8-a48ea50e7d8e',
      'content-type': 'application/json'
    }
  });

export default api;