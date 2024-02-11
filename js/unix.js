// import {weatherData} from "./app";
// export {sunriseFormattedTime, sunsetFormattedTime};

const sunriseTimestamp = weatherData.sys.sunrise;
const sunsetTimestamp =  weatherData.sys.sunset;

console.log(`Sonnenaufgang ${sunriseTimestamp}
Sonnenuntergang ${sunsetTimestamp}`)

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds
const sunriseDay = new Date(sunriseTimestamp * 1000);
const sunsetDay = new Date(sunsetTimestamp * 1000);

// Hours part from the timestamp
const sunriseHours = sunriseDay.getHours();
const sunsetHours = sunsetDay.getHours();

// Minutes part from the timestamp
const sunriseMinutes = "0" + sunriseDay.getMinutes();
const sunsetMinutes = "0" + sunsetDay.getMinutes();

// Seconds part from the timestamp
const sunriseSeconds = "0" + sunriseDay.getSeconds();
const sunsetSeconds = "0" + sunsetDay.getSeconds();

// Will display time in 10:30:23 format
const sunriseFormattedTime = sunriseHours + ':' + sunriseMinutes.substr(-2) + ':' + sunriseSeconds.substr(-2);
const sunsetFormattedTime = sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);

console.log(sunriseFormattedTime);
console.log(sunsetFormattedTime);