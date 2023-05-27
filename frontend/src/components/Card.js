import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const { name, link, likes } = card

    const isOwn = card.owner === currentUser._id;

    const isLiked = likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button-active'}`
     );

    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card._id);
    }

    return(
        <li className="element" id={card.id}>
            <img className="element__image" src={`${link}`} alt={name} onClick={handleCardClick}/>
            {isOwn && <button className="element__trash-button" type="button" onClick={handleDeleteClick}></button>}
            <div className="element__card">
                <h2 className="element__title">{name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card