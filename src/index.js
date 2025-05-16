function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value + " Weather";
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);
