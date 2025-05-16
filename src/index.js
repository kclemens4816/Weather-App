function refreshWeather(response) {
  console.log(response);
  let tempElement = document.querySelector("#current-htemp");
  let temp = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city + " Weather";
  tempElement.innerHTML = temp;
}

function searchCity(city) {
  let apiKey = "e36bedf058ea7aaa7t6f690378o56bd4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);
