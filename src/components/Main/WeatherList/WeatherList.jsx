import React, { useEffect, useState, useRef } from 'react';
import WeatherCard from './WeatherCard';
import { v4 as uuidv4 } from 'uuid';
import './WeatherList.css'

const WeatherList = () => {
  const [value, setValue] = useState("Madrid");
  const [weather, setWeather] = useState([]);
  const [coords, setCoords] = useState(null);
  const formRef = useRef(null);

  const getWeatherByCity = async (city) => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_SOME_KEY}`
      );
      const data = await resp.json();
      setWeather(data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherByCoords = async (latitude, longitude) => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_SOME_KEY}`
      );
      const data = await resp.json();
      setWeather(data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (coords) {
      getWeatherByCoords(coords.latitude, coords.longitude);
    } else {
      getWeatherByCity(value);
    }
  }, [coords, value]);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            console.error("Error getting location:", err);
          }
        );
      }
    };
    fetchLocation();
  }, []);

  const paintWeather = () => {
    return weather.map((input) => (
      <WeatherCard
        key={uuidv4()}
        dataItem={input}
        dataTemp={input.main}
        dataWind={input.wind}
        dataWeather={input.weather[0]}
      />
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityName = e.target.cityName.value;
    setValue(cityName);
    setCoords(null);
    formRef.current.reset();
  };

  return (
    <section className='weather_main_container'>
      <article  className="search_section">
        <form onSubmit={handleSubmit} className="form" ref={formRef}>
          <div className="form-group">
            <label htmlFor="name"className="form-label">Escribe una Ciudad</label>
            <input type="text" name="cityName" id="name" className="form-input" />
            <button type="submit" className="form-button">Buscar</button>
          </div>
        </form>
      </article>
      <article className='weather_container'>
        <h2 className="weather-heading">Clima en {coords ? "tu ubicación actual" : value}</h2>
        {weather.length !== 0 ? paintWeather() : <p className="loading-text">Cargando...</p>}
      </article>
    </section>
  );
};

export default WeatherList;
