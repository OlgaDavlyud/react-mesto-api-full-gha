import React from 'react';
import { Link } from 'react-router-dom';
import Bye from '../images/404.jpg';

function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
       <span>404</span> - Страница не найдена
      </h3>
      <img className="not-found__image" src={Bye} alt=""/>
      <p className="not-found__text">
       Ой, здесь ничего нет
      </p>
      <Link className="button button__type-to-main" to="/">Назад</Link>
    </div>
  )
}

export default PageNotFound;