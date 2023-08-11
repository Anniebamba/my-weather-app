function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function displayForecast(){
  forecastElement= document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun","Mon","Tue","Wed","Thur"]
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                <div class="col-2">
                <div class="weather-forecast-date">
                  ${day}</div>
                  <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" width="35">
                  <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-min">18°</span><span class="weather-forecast-temp-max">/20°</span>
                </div>
                </div>`;
  });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  ;
}



function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}Km/h`;
  let temperatureElement = document.querySelector("#temperature");
  celciusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celciusTemperature;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `Last updated ${formatDate(response.data.dt * 1000)}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "466e9221886a6c1c8d5c5e06eee0ec31";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function workOnSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function farenheitTemp(event) {
  event.preventDefault();
  celciusLink.classList.remove("default");
  farenheitLink.classList.add("default");
  let farenheitTemperature = celciusTemperature * (9 / 5) + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function celciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("default");
  farenheitLink.classList.remove("default");
  temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celciusTemperature;
}
let form = document.querySelector("#search");
form.addEventListener("submit", workOnSearch);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheitTemp);

let celciusTemperature = null;
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celciusTemp);
displayForecast();