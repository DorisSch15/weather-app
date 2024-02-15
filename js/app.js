import { getTime, getDay } from "./unix.js";


const form = document.querySelector('.weather__form');
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
    const list = document.querySelector('.weather__list');
    list.style.backgroundColor = "#FFB0B0";

    list.innerHTML = `
        <div class="weather__list-item weather__list-item-icon"><img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt=""></div> 
        <div class="weather__list-item weather__list-item-info"><span>${weatherData.weather[0].description}</span></div>
        <div class="weather__list-item"><span>Temperatur</span><span>${Math.round(weatherData.main.temp)} °C</span></div>
        <div class="weather__list-item"><span>Fühlt sich an wie</span><span>${Math.round(weatherData.main.feels_like)} °C</span></div>
        <div class="weather__list-item"><span>Sonnenaufgang</span><span>${getTime(weatherData.sys.sunrise + weatherData.timezone)} Uhr</span></div>
        <div class="weather__list-item"><span>Sonnenuntergang</span><span>${getTime(weatherData.sys.sunset + weatherData.timezone)} Uhr</span></div>
    `;
};

// several days !!
async function getForecast(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e449b5d801c6fc0ba6090fd71f6352e3&units=metric&lang=de`);
    const forecast = await response.json();

showForecast(forecast);
};

function showForecast(forecast){
    const viewport = document.querySelector('.weather__more-days');
    let itemString;

    // forecast.map(() => {
        
    //     console.log(itemString);
        
    //     if(itemString.dt_txt.includes('12:00:00') === true) {
    //         return `
    //         <li class="weather__more-days-item">
    //         <h5 class="weather__more-days-title">${getDay(time.dt)}</h5>
    //         <p class="weather__more-days-item-icon"><img src="http://openweathermap.org/img/wn/${time.weather[0].icon}@4x.png" alt=""></p> 
    //         <p class="weather__more-days-item-info"><span>${time.weather[0].description}</span></p>
    //         <p class="weather__more-days-item-text"><span>Temperatur</span><span>${Math.round(time.main.temp)} °C</span></p>
    //         <p class="weather__more-days-item-text"><span>Fühlt sich an wie</span><span>${Math.round(time.main.feels_like)} °C</span></p>
    //         </li>
    //         `;
    //     };
        
    //     itemString++

    // }).join('');
    
    // viewport.innerHTML = itemString;


    for(const time of forecast.list){
        if(time.dt_txt.includes('00:00:00') === true) {
            itemString += `
                <li class="weather__more-days-item">
                    <h5 class="weather__more-days-title">${getDay(time.dt)}</h5>
                    <p class="weather__more-days-item-icon"><img src="http://openweathermap.org/img/wn/${time.weather[0].icon}@4x.png" alt=""></p> 
                    <p class="weather__more-days-item-info"><span>${time.weather[0].description}</span></p>
                    <p class=""><span>Temperatur</span><span>${Math.round(time.main.temp)} °C</span></p>
                    <p class=""><span>Fühlt sich an wie</span><span>${Math.round(time.main.feels_like)} °C</span></p>
                </li>
        ` };
    };
    viewport.innerHTML = itemString;
    console.log(itemString);
};
