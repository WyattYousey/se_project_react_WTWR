import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultCoordinates } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  addItem,
  getItems,
  removeItem,
  getCurrentUser,
  editUserProfile,
  removeCardLike,
  addCardLike,
} from "../../utils/api";
import { signin, signup } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ProfileMobileModal from "../ProfileMobileModal/ProfileMobileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { fallbackApiKey } from "../../utils/constants.js";

import "./App.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY || fallbackApiKey;

  const toggleLoginAndSignoutModal = () => {
    activeModal === "user-login" ? setActiveModal("add-user") : setActiveModal("user-login");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const checkCurrentUser = () => {
    if (isLoading === false) setIsLoading(true);
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        if (err.code === 401) {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      })
      .finally(() => {
        if (isLoading === true) setIsLoading(false);
      });
  };

  const login = (data, resetForm) => {
    if (isLoading === false) setIsLoading(true);
    signin(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          checkCurrentUser();
          handleClose();
          resetForm();
        }
      })
      .catch(console.error)
      .finally(() => {
        if (isLoading === true) setIsLoading(false);
      });
  };

  const handleRegistration = (data, resetForm) => {
    setIsLoading(true);
    signup(data)
      .then(() => {
        localStorage.setItem("hasAccount", true);
        login(data, resetForm);
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    removeItem(id)
      .then(() => {
        const newData = clothingItems.filter((item) => item._id !== selectedCard._id);
        setClothingItems(newData);
        handleClose();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddItem = (data, resetForm) => {
    setIsLoading(true);
    const newCardData = {
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    };
    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        resetForm();
        handleClose();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUserEditProfile = (data, resetForm) => {
    setIsLoading(true);
    editUserProfile(data)
      .then((res) => {
        setCurrentUser(res);
        resetForm();
        handleClose();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) => cards.map((item) => (item._id === id ? updatedCard : item)));
          })
          .catch((err) => console.log(err))
      : removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) => cards.map((item) => (item._id === id ? updatedCard : item)));
          })
          .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F" ? setCurrentTemperatureUnit("C") : setCurrentTemperatureUnit("F");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSignUpClick = () => {
    setActiveModal("add-user");
  };

  const handleLogInClick = () => {
    setActiveModal("user-login");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleMobileProfileClick = () => {
    setActiveModal("mobile");
  };

  const handleConfirmDelete = () => {
    setActiveModal("delete");
  };

  const handleClose = () => {
    setActiveModal("");
  };

  //*Weather useEffect
  useEffect(() => {
    const fetchWeatherWithCoords = (coords) => {
      setIsLoading(true);

      getWeather(coords, apiKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    };

    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherWithCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeatherWithCoords(defaultCoordinates);
        },
      );
    } else {
      fetchWeatherWithCoords(defaultCoordinates);
    }
  }, []);

  //* Items useEffect
  useEffect(() => {
    setIsLoading(true);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  //*Auth useEffect
  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="app">
          <div className="page__content">
            {isLoading && weatherData.type === "" && (
              <div className="detecting-location">Detecting Location...</div>
            )}
            <Header
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              onMobileProfileClick={handleMobileProfileClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      signout={handleSignOut}
                      onCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            modalType={activeModal}
            isOpen={activeModal === "add-user"}
            handleClose={handleClose}
            signup={handleRegistration}
            isLoading={isLoading}
            toggleModals={toggleLoginAndSignoutModal}
          />
          <LoginModal
            modalType={activeModal}
            isOpen={activeModal === "user-login"}
            handleClose={handleClose}
            signin={login}
            isLoading={isLoading}
            toggleModals={toggleLoginAndSignoutModal}
          />
          <EditProfileModal
            modalType={activeModal}
            isOpen={activeModal === "edit-profile"}
            handleClose={handleClose}
            editProfile={handleUserEditProfile}
            isLoading={isLoading}
          />
          <AddItemModal
            modalType={activeModal}
            isOpen={activeModal === "add-garment"}
            handleClose={handleClose}
            handleAddItem={handleAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            modalType={activeModal}
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleDeleteClick={handleConfirmDelete}
            handleClose={handleClose}
          />
          <ProfileMobileModal
            isLoggedIn={isLoggedIn}
            modalType={activeModal}
            isOpen={activeModal === "mobile"}
            handleClose={handleClose}
            onAddClick={handleAddClick}
          />
          <DeleteModal
            modalType={activeModal}
            card={selectedCard}
            isOpen={activeModal === "delete"}
            handleClose={handleClose}
            handleDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
