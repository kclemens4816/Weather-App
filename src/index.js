//refresh current temperature
function refreshWeather(response) {
  //console.log(response);
  let htempElement = document.querySelector("#current-htemp");
  let temp = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#current-icon");

  //console.log(response.data);
  cityElement.innerHTML = response.data.city + " Weather";
  htempElement.innerHTML = temp;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  feelsLikeElement.innerHTML = `${feelsLike} °F`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-icon" />`;
  getForecast(response.data.city);
}

//date and time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateNumber = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day}, ${month} ${dateNumber}, ${hours}:${minutes}`;
}

//api
function searchCity(city) {
  let apiKey = "e36bedf058ea7aaa7t6f690378o56bd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

//search city change title
function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
//forecast days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}
// forecast
function getForecast(city) {
  let apiKey = "e36bedf058ea7aaa7t6f690378o56bd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  //console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  //console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="forecast-icon" />
            <div class="forecast-description">${day.condition.description}</div>
            <div class="forecast-temps">
              <div class="forecast-temp">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="forecast-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);

searchCity("Slinger");
