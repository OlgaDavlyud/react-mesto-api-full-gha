import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');

    useEffect(() => {
      setCardName("");
      setCardLink("");
    }, [isOpen]);

  function handleChangeCardName(evt) {
    setCardName(evt.target.value);
  }

  function handleChangeCardLink(evt) {
    setCardLink(evt.target.value);
  }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
          name: cardName,
          link: cardLink
        })
    }

    return(
        <PopupWithForm
        title="Новое место"
        name="add-card"
        buttonText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
          <label className="popup__form-field">
            <input
              className="popup__input popup__input-name-card"
              type="text"
              name="name"
              id="name-card"
              placeholder="Название"
              value={cardName}
              required=""
              minLength={1}
              maxLength={30}
              onChange={handleChangeCardName}
            />
            <span className="popup__error-visible name-card-error-visible" />
          </label>
          <label className="popup__form-field">
              <input
                className="popup__input popup__input-link-image"
                type="url"
                name="link"
                id="link-image"
                placeholder="Ссылка на картинку"
                value={cardLink}
                required=""
                onChange={handleChangeCardLink}
              />
              <span className="popup__error-visible link-image-error-visible" />
          </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;