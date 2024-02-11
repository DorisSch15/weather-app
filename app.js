const form = document.querySelector('.weather__form');
form.addEventListener('submit', getLatLon)

async function getLatLon(city) {
    city.preventDefault();

    const cityName = city.target[0].value;

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e449b5d801c6fc0ba6090fd71f6352e3`);
    const coordinates = await response.json();
    
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;

    getWeatherData(lat, lon);
}

async function getWeatherData(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e449b5d801c6fc0ba6090fd71f6352e3&units=metric&lang=de`);
        const weatherData = await response.json();

        console.log(weatherData)

    listWeatherData(weatherData);

    }
 
function listWeatherData(weatherData){
    const list = document.querySelector('.weather__list');

    list.innerHTML = `
        <li class="weather__list-item"><span>Bild</span><span>${weatherData.icon}</span></li>
        <li class="weather__list-item"><span>Wetter:</span><span>${weatherData.weather.main}</span></li>
        <li class="weather__list-item"><span>Beschreibung:</span><span>${weatherData.weather.description}</span></li>
        <li class="weather__list-item"><span>Teparatur:</span><span>${weatherData.main.temp}</span></li>
        <li class="weather__list-item"><span>Fühlt sich an wie:</span><span>${weatherData.main.feels_like}</span></li>
        <li class="weather__list-item"><span>Sonnenaufgang:</span><span>${weatherData.sys.sunrise}</span></li>
        <li class="weather__list-item"><span>Sonnenuntergang:</span><span>${weatherData.sys.sunset}</span></li>
    `;
};