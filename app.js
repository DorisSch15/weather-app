async function getWeatherData() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=51.509865&lon=-0.118092&appid=e449b5d801c6fc0ba6090fd71f6352e3&units=metric");
    const weatherData = await response.json();
    console.log(`The weather in ${weatherData.name} is beautiful and the temperatur is ${weatherData.main.temp} Celcius`);
}

getWeatherData();
