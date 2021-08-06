import React, { useState } from 'react';
import Input from './input/Input';

const Weather = (props) => {

    const [info, setInfo] = useState({
        country: null,
        location: null,
        temp: null,
        feels_like: null,
        humidity: null,
        description: null,
        wind_speed: null,
        img: 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/04d.png',
        month: null,
        day: null,
        inputValue: "",
    });

    const getWeather = (coords) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        
        if (typeof coords !== "string") {
            const apiQuery = apiUrl + "/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&mode=json&units=metric&lang=ru&appid=" + apiKey;
            return fetch(apiQuery)
                .then(response => response.json())
                .then(data => {
                    const initialState = {};
                    
                    initialState.country = data.sys.country; // место
                    initialState.location = data.name; // место
                    initialState.temp = Math.round(data.main.temp); // температура
                    initialState.feels_like = Math.round(data.main.feels_like); // температура по ощущениям 
                    initialState.humidity = data.main.humidity; // влажность
                    initialState.description = data.weather[0].description; // ясность
                    initialState.wind_speed = data.wind.speed; // скорость ветра
                    initialState.img = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${data.weather[0].icon}.png`;
                    const date = new Date();
                    const arrMonth = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
                    initialState.month = arrMonth[date.getMonth()];
                    initialState.day = date.getDate();
                    initialState.inputValue = "";
  
                    setInfo(initialState);
                })
                .catch(error => alert("Ошибка получения погоды. Причина: " + error));
        } else {
            const apiQuery = apiUrl + "/weather?q=" + coords + "&mode=json&units=metric&lang=ru&appid=" + apiKey;
            return fetch(apiQuery)
                .then(response => response.json())
                .then(data => {
                    const initialState = {};

                    initialState.country = data.sys.country; // место
                    initialState.location = data.name; // место
                    initialState.temp = Math.round(data.main.temp); // температура
                    initialState.feels_like = Math.round(data.main.feels_like); // температура по ощущениям 
                    initialState.humidity = data.main.humidity; // влажность
                    initialState.description = data.weather[0].description; // ясность
                    initialState.wind_speed = data.wind.speed; // скорость ветра
                    initialState.img = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${data.weather[0].icon}.png`;
                    const date = new Date();
                    const arrMonth = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
                    initialState.month = arrMonth[date.getMonth()];
                    initialState.day = date.getDate();
                    initialState.inputValue = "";
                    
                    setInfo(initialState);
                })
                .catch(error => alert("Ошибка получения погоды. Причина: " + error));
        }
        
    };
 
    const getCoords = () => {
        navigator.geolocation.getCurrentPosition(success, error);

        function success(position) {
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
            getWeather(coords);
        }

        function error() {
            alert(`Не удалось определить ваше местоположение. Загружаем для Минска.`);
            const coords = "Minsk";
            getWeather(coords);
        }
    }

    const onClickButoon = () => {
        getWeather(info.inputValue);
    }

    const onValueChange = (e) => {
        const newInfo = {};
        Object.assign(newInfo, info)
        newInfo.inputValue = e.target.value;
        setInfo(newInfo);
    }

    if (!info.country) getCoords();

  return (
    <div className="App">
        <div className="day">
                <div className="row top">
                    <p><span className="country">{info.country},</span><br></br><span className="location">{info.location}</span><br></br><span className="description">{info.description}</span></p>
                    <img src={info.img} alt="icon" className="icon"></img>
                </div>
                <div className="row center">
                    <div className="weather-left-temp"><span>{info.temp}° C</span></div>
                    <div className="weather-right-card">
                        <table className="weather-right__table">
                        <tbody><tr className="weather-right__items">
                            <th colSpan="2" className="weather-right__item details">подробности</th>
                        </tr>
                        <tr className="weather-right__items">
                            <td className="weather-right__item">Как будто</td>
                            <td className="weather-right__item weather-right__feels"><span>{info.feels_like}° C</span></td>
                        </tr>
                        <tr className="weather-right__items">
                            <td className="weather-right__item">Ветер</td>
                            <td className="weather-right__item weather-right__wind-speed">{info.wind_speed} м / с </td>
                        </tr>
                        <tr className="weather-right-card__items">
                            <td className="weather-right__item">Влажность</td>
                            <td className="weather-right__item weather-right__humidity">{info.humidity}%</td>
                        </tr>
                        </tbody></table>
                    </div>
                </div>
                <div className="row bottom">
                    <button onClick={ onClickButoon } id="openWeather">Найти</button>
                    <Input onValueChange={onValueChange} value={info.inputValue}/>
                    <span className="date">{info.day} {info.month}</span>
                </div>
            </div>
    </div>
  );
}

export default Weather;