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

function showTemperature(response) {
	console.log(response.data);
	let temperatureCell = document.querySelector("#strong-temp");
	let minTempCell = document.querySelector("#min-temp");
	let cityCell = document.querySelector("#city");
	let countryCell = document.querySelector("#country");
	let descriptionCell = document.querySelector("#description");
	let humidityCell = document.querySelector("#humidity");
	let windCell = document.querySelector("#wind");
	let iconCell = document.querySelector("#icon");

	celsiusTemperature = response.data.main.temp;
	minCelsiusTemperature = response.data.main.temp_min;
	temperatureCell.innerHTML = Math.round(celsiusTemperature);
  	minTempCell.innerHTML = Math.round(minCelsiusTemperature);
	cityCell.innerHTML = response.data.name;
	countryCell.innerHTML = response.data.sys.country;
	descriptionCell.innerHTML = response.data.weather[0].description;
	humidityCell.innerHTML = Math.round(response.data.main.humidity);
	windCell.innerHTML = Math.round(response.data.wind.speed);
	iconCell.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  	iconCell.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
	let apiKey = "7db589669794c40edb745ea0a4fe919c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
}



function citySearch(event) {
	event.preventDefault();
	let cityItemCell = document.querySelector("#form-item");
	search(cityItemCell.value);
}


function showTemperatureFahrenheit(event) {
	event.preventDefault();
	let temperatureCell = document.querySelector("#strong-temp");
	let minTemperatureCell = document.querySelector("#min-temp");
	let temperatureFahrenheit = celsiusTemperature * 1.8 + 32;
	let minTemperatureFahrenheit = minCelsiusTemperature * 1.8 + 32;
	celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
	temperatureCell.innerHTML = Math.round(temperatureFahrenheit);
	minTemperatureCell.innerHTML = Math.round(minTemperatureFahrenheit);
}

function showTemperatureCelcius(event) {
	event.preventDefault();
	let temperatureCell = document.querySelector("#strong-temp");
	let minTemperatureCell = document.querySelector("#min-temp");
	celciusLink.classList.add("active");
  	fahrenheitLink.classList.remove("active");
	temperatureCell.innerHTML = Math.round(celsiusTemperature);
	minTemperatureCell.innerHTML = Math.round(minCelsiusTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showTemperatureFahrenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showTemperatureCelcius);

search("Rivne");
