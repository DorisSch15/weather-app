import { unixFormattedTime } from "./unix.js";

const form = document.querySelector('.weather__form');
form.addEventListener('submit', getLatLon)

async function getLatLon(city) {
    city.preventDefault();

    const cityName = city.target[0].value;

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e449b5d801c6fc0ba6090fd71f6352e3`);
    const coordinates = await response.json();
    
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;

    getWeatherData(lat, lon);
}

async function getWeatherData(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e449b5d801c6fc0ba6090fd71f6352e3&units=metric&lang=de`);
        let weatherData = await response.json();

    listWeatherData(weatherData);

};

function currentWeather(){
    navigator.geolocation.getCurrentPosition((currentCity) => {
        getWeatherData(currentCity.coords.latitude, currentCity.coords.longitude);
    });
};

currentWeather();
 
function listWeatherData(weatherData){
    const list = document.querySelector('.weather__list');

    list.innerHTML = `
        <li class="weather__list-item weather__list-item-icon"><img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt=""></li> 
        <li class="weather__list-item weather__list-item-info"><span>${weatherData.weather[0].description}</span></li>
        <li class="weather__list-item"><span>Teparatur</span><span>${Math.round(weatherData.main.temp)} °C</span></li>
        <li class="weather__list-item"><span>Fühlt sich an wie</span><span>${Math.round(weatherData.main.feels_like)} °C</span></li>
        <li class="weather__list-item"><span>Sonnenaufgang</span><span>${unixFormattedTime(weatherData.sys.sunrise)} Uhr</span></li>
        <li class="weather__list-item"><span>Sonnenuntergang</span><span>${unixFormattedTime(weatherData.sys.sunset)} Uhr</span></li>
    `;
};

{/* <li class="weather__list-item"><span>Bild</span><img src="${weatherData.weather[0].icon}" alt=""></li> */}
