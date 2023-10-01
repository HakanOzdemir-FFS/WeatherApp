import React, { useState } from "react";
import "./WeatherFilter.css";

function WeatherFilter(props) {
  const [cityName, setCityName] = useState("Antalya");
  const cities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkâri",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kilis",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Şanlıurfa",
    "Siirt",
    "Sinop",
    "Şırnak",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak",
  ];

  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCityName(value);
    if (value) {
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const cityNameHandler = (event) => {
    props.onCityName(cityName);
    setCityName("");
  };

  const selectSuggestion = (suggestion) => {
    setCityName(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      cityNameHandler();
    }
  };

  return (
    <div className="filter">
      <input
        className="filter__input"
        placeholder="City Name"
        type="text"
        value={cityName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => selectSuggestion(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      <button tabIndex="0" className="filter__button" 
      onKeyDown={handleKeyDown}
      onClick={cityNameHandler}>
        Göster
      </button>
    </div>
  );
}

export default WeatherFilter;
