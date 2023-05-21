import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup-show ${card.link ? 'popup_opened' : !''}`}>
            <div className="popup__show-container">
                <button
                    className="popup__button-close popup__show-button-close"
                    type="reset"
                    name="button-close"
                    onClick={onClose}
                ></button>
                <img className="popup__show-image" src={`${card.link}`} alt={card.name} />
                <p className="popup__show-name">{card.name}</p>
            </div>
      </div>
    );
}

export default ImagePopup