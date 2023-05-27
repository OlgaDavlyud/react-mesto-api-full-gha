import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../index.css";
import api from "../utils/Api.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
import * as Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState({ email: "" });
  const [statusOk, setStatusOk] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialUserData(), api.getInitialCards()])
        .then(([data, dataCard]) => {
          setCurrentUser(data);
          setCards(dataCard);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function openInfoTooltip() {
    setIsInfoTooltip(!isInfoTooltip);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function closeInfoTooltip() {
    setIsInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then((data) => {
        console.log(data);
        setCards((cards) => cards.filter((c) => c._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .changeUserData(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setNewAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegister = (email, password) => {
    Auth.register(email, password)
      .then((res) => {
        console.log(res);
        setStatusOk(true);
        openInfoTooltip();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip();
      });
  };

  function handleLogin(email, password) {
    Auth.login(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserEmail({ email: email });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setStatusOk(false);
        openInfoTooltip();
        console.log(err);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail({ email: res.email });
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          localStorage.removeItem('token');
          console.log(err);
        });
    }
  }, []);

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail({ email: "" });
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} signOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        {/*Попап редактирования данных*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/*Попап добавления карточек*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/*Попап редактирования аватара*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/*Попап подтверждения удаления карточки*/}
        <PopupWithConfirmation
          title="Вы уверены?"
          name="delete"
          buttonText="Да"
        />
        {/*Попап отображения большой карточки*/}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {/* Попап проверки регистрации */}
        <InfoTooltip
          statusOk={statusOk}
          isOpen={isInfoTooltip}
          onClose={closeInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;