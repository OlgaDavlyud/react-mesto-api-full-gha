import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputref = useRef();

  useEffect(() => {
    avatarInputref.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
      evt.preventDefault();

      onUpdateAvatar({
        avatar: avatarInputref.current.value,
      });
  }

  return (
      <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <label className="popup__form-field">
          <input
            ref={avatarInputref}
            className="popup__input popup__input-update-avatar"
            type="url"
            name="avatar"
            id="avatar"
            placeholder="Ссылка на аватар"
            required=""
          />
          <span className="popup__error-visible avatar-error-visible" />
        </label>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;