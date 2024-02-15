import { getTime, getDay } from "./unix.js";


const form = document.querySelector('.form');
form.addEventListener('submit', getLatLon);

async function getLatLon(event) {
    event.preventDefault();

    const cityName = event.target[0].value;

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e449b5d801c6fc0ba6090fd71f6352e3`);
    const coordinates = await response.json();
    
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;

    getWeatherData(lat, lon);
    getForecast(lat, lon);
};

async function getWeatherData(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e449b5d801c6fc0ba6090fd71f6352e3&units=metric&lang=de`);
        let weatherData = await response.json();

    listWeatherData(weatherData);
};

function currentWeather(){
    navigator.geolocation.getCurrentPosition((currentCity) => {
        getWeatherData(currentCity.coords.latitude, currentCity.coords.longitude);
        getForecast(currentCity.coords.latitude, currentCity.coords.longitude);
    });
};

currentWeather();


// one day weather 
function listWeatherData(weatherData){
    const list = document.querySelector('.today');

    list.innerHTML = `
        <div class="today__item today__item-icon">
            <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="">
        </div> 
        <div class="today__item today__item-info">
            <p>${weatherData.weather[0].description}</p>
        </div>
        <div class="today__item">
            <p>Temperatur</p>
            <p>${Math.round(weatherData.main.temp)} °C</p>
        </div>
        <div class="today__item">
            <p>Fühlt sich an wie</p>
            <p>${Math.round(weatherData.main.feels_like)} °C</span>
        </div>
        <div class="today__item">
            <p>Sonnenaufgang</p>
            <p>${getTime(weatherData.sys.sunrise + weatherData.timezone)} Uhr</p>
        </div>
        <div class="today__item">
            <p>Sonnenuntergang</p>
            <p>${getTime(weatherData.sys.sunset + weatherData.timezone)} Uhr</p>
        </div>
    `;
};

// several days !!
async function getForecast(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e449b5d801c6fc0ba6090fd71f6352e3&units=metric&lang=de`);
    const forecast = await response.json();

showForecast(forecast);
};

function showForecast(forecast){
    const viewport = document.querySelector('.forecast');
    let itemString = '';

    for(const time of forecast.list){
        if(time.dt_txt.includes('12:00:00')) {
            itemString += `
                <li class="forecast-item">
                    <h4 class="forecast-title">${getDay(time.dt)}</h4>
                    <p class="forecast-item-icon">
                        <img src="http://openweathermap.org/img/wn/${time.weather[0].icon}@4x.png" alt="">
                    </p> 
                    <p class="forecast-item-info">
                        <span>${time.weather[0].description}</span>
                    </p>
                    <p class="forecast-item-text">
                        <span>Temperatur</span><span>${Math.round(time.main.temp)} °C</span>
                    </p>
                    <p class="forecast-item-text">
                        <span>Fühlt sich an wie</span>
                        <span>${Math.round(time.main.feels_like)} °C</span>
                    </p>
                </li>
        ` };
    };
    viewport.innerHTML = itemString;
};
