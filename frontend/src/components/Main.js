import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Аватар профиля" />
                    <button
                    className="profile__avatar-button"
                    type="button"
                    onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                    className="profile__edit-button"
                    type="button"
                    onClick={onEditProfile}
                    />
                    </div>
                    <p className="profile__about-yourself">{currentUser.about}</p>
                </div>
                <button
                className="profile__add-button"
                type="button"
                onClick={onAddPlace}
                />
            </section>
            <section>
                <ul className="elements">
                    {
                        cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
      </main>
    );
}

export default Main