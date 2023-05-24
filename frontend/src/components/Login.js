import React, { useState } from 'react';

function Login({ onLogin }) {
    const [formValue, setFormValue] = useState({email: '', password: ''});

      const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
          ...formValue,
          [name]: value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        if (!email || !password){
          return;
        }
        onLogin(email, password);
        setFormValue({ email: '', password: '' });
      }

    return(
        <div className="login">
            <div className="login__container">
                <p className="login__title">Вход</p>
                <form className="login__form" name="login__form" onSubmit={handleSubmit}>
                    <label className="login__form-field">
                    <input
                        className="login__input login__input-email"
                        type="email"
                        name="email"
                        id="emailAddress"
                        placeholder="Email"
                        value={formValue.email}
                        required=""
                        minLength={4}
                        maxLength={30}
                        onChange={handleChange}
                    />
                    <span className="login__error-visible email-error-visible" />
                    </label>
                    <label className="login__form-field">
                        <input
                            className="login__input login__input-password"
                            type="password"
                            name="password"
                            id="userPassword"
                            placeholder="Пароль"
                            value={formValue.password}
                            required=""
                            minLength={2}
                            maxLength={200}
                            onChange={handleChange}
                        />
                        <span className="login__error-visible password-error-visible" />
                    </label>
                    <button
                        className="login__button-submit"
                        type="submit"
                        name="button-submit"
                        >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login