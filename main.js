import { BUTTONS, UI_ELEMENTS, serverUrl, apiKey, } from "./view.js";
import { weatherNow, weatherDetails, weatherForecast } from "./chenge_weather.js";
import { setLocalStorage, chengeLocalStoreage, favorit_list } from "./storage.js";

BUTTONS.FAVORIT_BUTTON.addEventListener("click", checkFavoritCity);
BUTTONS.DELETE_BUTTON.forEach(button => button.addEventListener("click", deleteCity));
UI_ELEMENTS.FAVORIT_LIST.forEach(city => city.addEventListener("click", getFavoritCity));
BUTTONS.SUBMIT_BUTTON.addEventListener("click", changeWeather);


function checkFavoritCity() {
    const cityName = document.querySelector(".cityName").innerHTML
    if (cityName !== "") {
        const favoritCityArray = [];
        const favoritList = document.querySelectorAll(".enterCity");
        favoritList.forEach(city => favoritCityArray.push(city.textContent));
        const favoritCity = favoritCityArray.find(city => city === cityName);
        !favoritCity ? addFavoritCity(cityName) : "";
    }
}

function addFavoritCity(city) {
    const cityName = city;
    if (city !== "") {
        const listLocation = document.querySelector(".listLocation");
        const element = `<li class="location"> 
        <button class="enterCity">${cityName}</button>
        <button class="deleteButton"></button></li>`
        listLocation.insertAdjacentHTML("afterbegin", element);
        listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
        listLocation.firstElementChild.firstElementChild.addEventListener("click", getFavoritCity);
        setLocalStorage(cityName);

    }
}



function deleteCity(event) {
    const location = event.currentTarget.parentElement;
    const locationItem = location.firstElementChild.innerHTML;
    const chenged_list = favorit_list.filter(item => item !== locationItem);
    location.remove();
    localStorage.setItem("list", JSON.stringify(chenged_list))
}

function getFavoritCity(event) {
    const city = event.currentTarget.textContent;
    document.querySelector(".inputWindow").value = city;
    localStorage.setItem("city", JSON.stringify(city))
    changeWeather();
}

function getName() {
    const cityName = document.querySelector(".inputWindow").value;
    return cityName;
}

function creatUrl() {
    const cityName = getName();
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
    localStorage.setItem("city", JSON.stringify(cityName))
    document.querySelector(".inputWindow").value = "";
}

function startPage() {
    const currentCity = JSON.parse(localStorage.getItem("city"));
    if (currentCity !== "") { document.querySelector(".inputWindow").value = currentCity; }
    document.querySelector(".nowBtn").classList.add("aktiv_btn");
    UI_ELEMENTS.TABS.forEach(item => item.classList.add("infoWeatherPassiv"));
    document.querySelector(".infoWeatherNow").classList.add("infoWeatherAktiv");
}
startPage()
chengeLocalStoreage();

export { creatUrl, changeWeather, addFavoritCity, getName };