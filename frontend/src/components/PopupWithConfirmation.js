import React from 'react';

function PopupWithConfirmation({title, name, buttonText, onClose}) {
    return (
        <div className={`popup popup-${name}`}>
            <div className={`popup__${name}-container`}>
                <button
                    className="popup__button-close"
                    type="reset"
                    name="button-close"
                    onClick={onClose}
                ></button>
                <h2 className={`popup__title-${name}`}>{title}</h2>
                <form className="popup__form" name={`popup-form-${name}`}>
                    <button
                    className="popup__button-submit"
                    type="submit"
                    name="button-submit"
                    value={buttonText}
                    >
                    {buttonText}
                    </button>
                </form>
            </div>
      </div>
    );
}

export default PopupWithConfirmation