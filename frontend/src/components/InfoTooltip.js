import React from "react";
import done from "../images/done.svg";
import error from "../images/error.svg";

function InfoTooltip({ isOpen, onClose, statusOk }) {
  return (
    <div className={`popup popup-info-tooltip ${isOpen && "popup_opened"}`}>
      <div className={`popup__info-tooltip-container`}>
        <button
          className="popup__button-close"
          type="reset"
          name="button-close"
          onClick={onClose}
        ></button>
        <div className="popup__info-tooltip-form">
          <div className="popup__tooltip-image">
            {statusOk ? (
              <img src={done} alt="Выполнено" />
            ) : (
              <img src={error} alt="Ошибка" />
            )}
          </div>
          <p className="popup__text-info-tooltip">
            {statusOk
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;