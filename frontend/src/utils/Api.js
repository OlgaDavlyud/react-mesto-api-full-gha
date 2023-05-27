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
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }

    // Запрос получения карточек с сервера
    getInitialCards() {
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }

    // Запрос изменения данных пользователя
    changeUserData(data) {
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              about: data.about,
            })
        })
        .then(this._checkResponse);
    }

    // Запрос добавления карточки
    addCard(data) {
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then(this._checkResponse);
    }

    // Запрос удаления карточки
    deleteCard(id) {
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._checkResponse);
    }

    // Запрос установки и снятия лайка
    changeLikeCardStatus(id, isLiked) {
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(this._checkResponse);
    }

    // Запрос обновления аватара
    setNewAvatar(avatar) {
        const token = localStorage.getItem('token');

        return fetch (`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkResponse);
    }
}

const api = new Api({
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://api.davlyud.nomoredomains.monster',
  });

export default api;