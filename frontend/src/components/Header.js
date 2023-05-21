import React from 'react';
import logo from '../images/logo.png';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, signOut }) {
  let { email } = userEmail;

    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Место Россия - логотип проекта"
            />
            <Routes>
              <Route exact path="/" element={
                <div className="header__wrapper">
                  <p className="header__user">{ email }</p>
                  <button className="header__logout" onClick={signOut}>Выйти</button>
                </div>}>
              </Route>
              <Route path="/sign-up" element={
              <Link className="header__auth-link" to="/sign-in">Войти</Link>}>
              </Route>
              <Route path="/sign-in" element={
              <Link className="header__auth-link" to="/sign-up">Регистрация</Link>}>
              </Route>
            </Routes>
        </header>
    );
}

export default Header