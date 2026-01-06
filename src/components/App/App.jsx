import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, defaultValues } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ProfileMobileModal from "../ProfileMobileModal/ProfileMobileModal";
import { addItem, getItems, removeItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import { apiKey } from "../../utils/constants";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    setIsLoading(true);
    removeItem(id)
      .then(() => {
        const newData = clothingItems.filter((item) => item._id !== selectedCard._id);
        setClothingItems(newData);
        handleClose();
      })
      .catch(console.error)
      .finally(setIsLoading(false));
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
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        data.reverse();
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className="app">
        <div className="page__content">
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
                <Profile
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
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
  );
}

export default App;
