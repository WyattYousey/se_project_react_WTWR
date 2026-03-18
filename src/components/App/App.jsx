import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultCoordinates } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { addItem, getItems, removeItem, signup, signin, getCurrentUser } from "../../utils/api";
import { apiKey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ProfileMobileModal from "../ProfileMobileModal/ProfileMobileModal";
import RegisterModal from "../RegisterModal/Registermodal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("user-login");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkCurrentUser = () => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");

    if (token) {
      getCurrentUser(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }
        })
        .catch(console.error);
    }
  };

  const login = (data, resetForm) => {
    setIsLoading(true);
    signin(data)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res);
          checkCurrentUser(res);
          handleClose();
          resetForm();
        } else {
          throw new Error("No token Provided");
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegistration = (data, resetForm) => {
    setIsLoading(true);
    signup(data)
      .then(() => {
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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F" ? setCurrentTemperatureUnit("C") : setCurrentTemperatureUnit("F");
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

  useEffect(() => {
    const fetchWeatherWithCoords = (coords) => {
      setIsLoading(true);
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    };

    // indicate that location detection is in progress until we fetch weather
    setIsLoading(true);

    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          fetchWeatherWithCoords(coords);
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeatherWithCoords(defaultCoordinates);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    } else {
      // Geolocation not supported, use fallback
      fetchWeatherWithCoords(defaultCoordinates);
    }

    getItems()
      .then((data) => {
        data.reverse();
        setClothingItems(data);
      })
      .catch(console.error);
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
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              onMobileProfileClick={handleMobileProfileClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
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
          />
          <LoginModal
            modalType={activeModal}
            isOpen={activeModal === "user-login"}
            handleClose={handleClose}
            signin={login}
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
