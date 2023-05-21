import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
          name: name,
          about: description
        })
    }

    return (
        <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
            <label className="popup__form-field">
              <input
                  className="popup__input popup__input-profile-name"
                  type="text"
                  name="name"
                  id="profile-name"
                  placeholder="Имя"
                  value={name || ""}
                  required=""
                  minLength={2}
                  maxLength={40}
                  onChange={handleChangeName}
              />
              <span className="popup__error-visible profile-name-error-visible " />
            </label>
            <label className="popup__form-field">
                <input
                    className="popup__input popup__input-profile-about-yourself"
                    type="text"
                    name="about"
                    id="profile-about-yourself"
                    placeholder="Вид деятельности"
                    value={description || ""}
                    required=""
                    minLength={2}
                    maxLength={200}
                    onChange={handleChangeDescription}
                />
                <span className="popup__error-visible profile-about-yourself-error-visible" />
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;