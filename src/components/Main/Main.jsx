import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ handleCardClick, weatherData, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const visibleItems = clothingItems.filter((item) => item.weather === weatherData.type);

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
          return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />;
        })}
      </ul>
    </main>
  );
}

export default Main;
