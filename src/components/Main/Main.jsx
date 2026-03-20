import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ onCardLike, handleCardClick, weatherData, clothingItems, isLoggedIn }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  let visibleItems = clothingItems.filter((item) => {
    return item.weather === weatherData.type && item.owner === currentUser?._id;
  });

  if (!isLoggedIn) {
    visibleItems = clothingItems.filter(item => {
      return item.weather === weatherData.type && item.isDemo === true
    })
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit}/ You may want to
          wear:
        </p>
      </section>
      <ul className="cards__list">
        {visibleItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardLike={onCardLike} onCardClick={handleCardClick} />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
