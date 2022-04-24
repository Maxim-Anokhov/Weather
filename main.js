import { BUTTONS, UI_ELEMENTS, serverUrl, apiKey, } from "./view.js";
import { weatherNow, weatherDetails, weatherForecast, responseForecast } from "./weather.js";
import { favoritCityes, chengeFavoritCityes, currentCity } from "./storage.js";

BUTTONS.FAVORIT_BUTTON.addEventListener("click", checkFavoritCity);
BUTTONS.DELETE_BUTTON.forEach(button => button.addEventListener("click", deleteCity));
UI_ELEMENTS.FAVORIT_LIST.forEach(city => city.addEventListener("click", getFavoritCity));
BUTTONS.SUBMIT_BUTTON.addEventListener("submit", changeWeather);

const favorit_list = new Set();

function checkFavoritCity() {
    const cityName = document.querySelector(".cityName").innerHTML;

    if (cityName !== "") {
        const list = [];
        const favoritList = document.querySelectorAll(".enterCity");
        favoritList.forEach(city => list.push(city.textContent));
        const currentCity = list.find(city => city === cityName);
        if (!currentCity) {
            addFavoritCity(cityName);
            favorit_list.add(cityName);
        }
    }
}

function addFavoritCity(city) {
    const listLocation = document.querySelector(".listLocation");
    const element = `<li class="location"> 
        <button class="enterCity">${city}</button>
        <button class="deleteButton"></button></li>`
    listLocation.insertAdjacentHTML("afterbegin", element);
    listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
    listLocation.firstElementChild.firstElementChild.addEventListener("click", getFavoritCity);
    favoritCityes(city);
}

function deleteCity(event) {
    const location = event.currentTarget.parentElement;
    const locationItem = location.firstElementChild.innerHTML;
    const chenged_list = favorit_list.delete(item => item !== locationItem);
    localStorage.setItem("list", JSON.stringify(chenged_list));
    location.remove();
}

function getFavoritCity(event) {
    const city = event.currentTarget.textContent;
    document.querySelector(".inputWindow").value = city;
    currentCity(city)
    changeWeather();
}

function getName() {
    const cityName = document.querySelector(".inputWindow").value;
    return cityName;
}

function creatUrl(city) {
    let cityName;
    if (city !== undefined) {
        cityName = city;
    } else {
        cityName = getName();
    }
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

function changeWeather(event) {
    if (event) { event.preventDefault(); }
    let cityName = getName();
    if (cityName !== "") {
        weatherNow();
        weatherDetails();
        weatherForecast();
    }
    currentCity(cityName);
    document.querySelector(".inputWindow").value = "";
}

function startPage() {

    document.querySelector(".nowBtn").classList.add("aktiv_btn");
    UI_ELEMENTS.TABS.forEach(item => item.classList.add("infoWeatherPassiv"));
    document.querySelector(".infoWeatherNow").classList.add("infoWeatherAktiv");
    const currentCity = JSON.parse(localStorage.getItem("city"));
    if (currentCity == undefined || null || "") {

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            responseForecast(latitude, longitude);
        })
    } else {

        document.querySelector(".inputWindow").value = currentCity;
        changeWeather()
    }
}
startPage()
chengeFavoritCityes();

export { creatUrl, changeWeather, addFavoritCity, getName, favorit_list };