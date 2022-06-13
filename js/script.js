function citySearch(event) {
  event.preventDefault();
  let newCity = document.querySelector(".city-name");
  let inputCity = document.querySelector(".form-item");
  let userCity = inputCity.value;
  newCity.innerHTML = userCity.charAt(0).toUpperCase() + userCity.slice(1);
  let myKey = "7db589669794c40edb745ea0a4fe919c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=${units}&appid=${myKey}`;
  axios.get(apiUrl).then(temperatureCity);
}
let searchForm = document.querySelector(".form-inner");
searchForm.addEventListener("submit", citySearch);



function showPosition(position) {
  let myKey = "7db589669794c40edb745ea0a4fe919c";
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}`;
  axios.get(apiUrl).then(temperatureCity);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function temperatureCity(response) {
  console.log(response.data);
  let tempCity = Math.round(response.data.main.temp);
  let tempUserCity = document.querySelector(".temperatur-strong");
  tempUserCity.innerHTML = `${tempCity}°`;
  let minTemp = Math.round(response.data.main.temp_min);
  let showMinTemp = document.querySelector(".min-temp");
  showMinTemp.innerHTML = `/${minTemp}°`;
  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector(".humidity-meaning");
  showHumidity.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector(".wind-meaning");
  showWind.innerHTML = `${wind}`;
  let weatherElement = response.data.weather[0].description;
  let newWeatherElement = weatherElement.charAt(0).toUpperCase() + weatherElement.slice(1);
  let showWeatherElement = document.querySelector("#description");
  showWeatherElement.innerHTML = `${newWeatherElement}`;
  let newCity = document.querySelector(".city-name");
  newCity.innerHTML = `${response.data.name}`;
  let iconElement = document.querySelector("#icon");
  let showIcon = response.data.weather[0].icon;
  alert(showIcon);
  iconElement.setAttribute("src", `img/${showIcon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  // let iconWeather = document.querySelector("#icon");
  // iconWeather.setAttribute("src", "https://openweathermap.org/img/wn/01d@2x.png");
}

let userLocation = document.querySelector(".form-position");
userLocation.addEventListener("click", getCurrentPosition);

let currentDate = new Date();

let daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = daysWeek[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();

let nameCurrentDay = document.querySelector(".day-name");
nameCurrentDay.innerHTML = `${currentDay}`;

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentTime = document.querySelector(".times");
currentTime.innerHTML = `${currentHour} : ${currentMinutes}`;

// function showTemperatureC(event) {
//   event.preventDefault();
//   let temperatureCelcius = document.querySelector(".temperatur-item1");
//   let currentTempC = 20;
//   let realTempC = 17;
//   temperatureCelcius.innerHTML =
//     Math.round(currentTempC) + "°/" + Math.round(realTempC) + "°";
// }
// let celciusLink = document.querySelector("#celcius");
// celciusLink.addEventListener("click", showTemperatureC);

// function showTemperatureF(event) {
//   event.preventDefault();
//   let temperatureFahrenheit = document.querySelector(".temperatur-item1");
//   let currentTempC = 20;
//   let realTempC = 17;
//   temperatureFahrenheit.innerHTML =
//     Math.round(currentTempC * 1.8 + 32) +
//     "°" +
//     "/" +
//     Math.round(realTempC * 1.8 + 32) +
//     "°";
// }
// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", showTemperatureF);


// function userLocation(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//   let myKey = "7db589669794c40edb745ea0a4fe919c";
//   let unit = "metric";
//   let currentUrl = "https://api.openweathermap.org/data/2.5/weather";
//   let apiUrl = `${currentUrl}?lat=${latitude}&lon=${longitude}&appid=${myKey}&units=${unit}`;

 
// }

// function showUserLocation(event)