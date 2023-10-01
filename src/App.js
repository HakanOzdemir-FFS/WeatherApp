import React, { useState } from "react";
import WeatherFilter from "./Component/WeatherFilter";
import WeatherCard from "./Component/WeatherCard";

function App() {
  const [selectedCity, setSelectedCity] = useState("Antalya"); //

  const onCityNameHandler = (city) => {
    setSelectedCity(city);
  };

  return (
    <WeatherCard onSetCityName={selectedCity}>
      <WeatherFilter onCityName={onCityNameHandler} />
    </WeatherCard>
  );
}

export default App;
