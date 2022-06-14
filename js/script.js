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

search = ("Rivne");

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
  let tempUserCity = document.querySelector(".temperatur-strong");
  tempUserCity.innerHTML = Math.round(response.data.main.temp);
  let showMinTemp = document.querySelector(".min-temp");
  showMinTemp.innerHTML = Math.round(response.data.main.temp_min);
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
  iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

 celsiusTemperature = response.data.main.temp;
 minCelsiusTemperature = response.data.main.temp_min;
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


function showTemperatureF(event) {
  event.preventDefault();
  let tempUserCity = document.querySelector(".temperatur-strong");
  //remove the active class the celsius link
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempUserCity.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
  let showMinTemp = document.querySelector(".min-temp");
  showMinTemp.innerHTML = Math.round(minCelsiusTemperature * 1.8 + 32);
}

function showTemperatureC(event) {
  event.preventDefault();
  let tempUserCity = document.querySelector(".temperatur-strong");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempUserCity.innerHTML = Math.round(celsiusTemperature);
  let showMinTemp = document.querySelector(".min-temp");
  showMinTemp.innerHTML = Math.round(minCelsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showTemperatureF);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showTemperatureC);


