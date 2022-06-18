let currentDate = new Date();

let daysWeek = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
let currentDay = daysWeek[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
let months  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = months[currentDate.getMonth()];

let nameCurrentDay = document.querySelector(".day-name");
nameCurrentDay.innerHTML = `${currentDay}`;

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentTime = document.querySelector(".times");
currentTime.innerHTML = `, ${currentHour} : ${currentMinutes}`;

let newDate = currentDate.getDate();


function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
	return days[day];
	
}


function showForecast(response) {
	let forecast = response.data.daily;
	let forecastCell = document.querySelector("#forecast");
	let forecastHTML = `<div class="row forecast-item">`;
	
	forecast.forEach(function(forecastDay, index) {
		let forecastC = `Math.round(${forecast}.temp.max)`;
		if (index < 5) {
		forecastHTML = forecastHTML + `
					<div class="col-2">
						
						<h3 class="accordion-day1">${formatDay(forecastDay.dt)}</h3>
						
						<h3 class="accordion-month1">${forecastDay.weather[0].main}</h3>
					</div>
					<div class="col-2">
						<img class="accordion-img img-fluid" src="img/${forecastDay.weather[0].icon}.png" alt="sunny">
						<p class="accordion-content"><strong class="temperature-forecast-max">${Math.round(forecastDay.temp.max)}°/</strong><span
								class="temperature-forecast-min">${Math.round(forecastDay.temp.min)}°</span></p>
					</div>
					<div class="col-2">
						<img class="accordion-img img-fluid" src="img/humidity.png" alt="Humidity">
						<p class="accordion-content">${forecastDay.humidity}%</p>
					</div>
					<div class="col-2">
						<img class="accordion-img img-fluid" src="img/wind.png" alt="wind">
						<p class="accordion-content">${Math.round(forecastDay.wind_speed)} km/h</p>
					</div>
					<div class="col-2">
						<img class="accordion-img img-fluid" src="img/precipitation.png" alt="sunny">
						<p class="accordion-content">${Math.round(forecastDay.pop * 100)} %</p>
					</div>
					<div class="col-2">
						<img class="accordion-img-barometr img-fluid" src="img/barometer.png" alt="sunny">
						<p class="accordion-content">${forecastDay.pressure}</p>
					</div>
					<button class="btn-line"></button>
				`;
		}
	});
	forecastHTML = forecastHTML + `</div>`
	forecastCell.innerHTML = forecastHTML;	
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "7db589669794c40edb745ea0a4fe919c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
	console.log(apiUrl);
	axios.get(apiUrl).then(showForecast);
}

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
	let monthCell = document.querySelector("#month");
	let dateCell = document.querySelector("#number");

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
	monthCell.innerHTML = `${currentMonth}`
	dateCell.innerHTML = `${newDate}`;

	getForecast(response.data.coord);
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



search("Rivne");

