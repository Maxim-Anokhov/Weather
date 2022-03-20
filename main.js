import { BUTTONS, UI_ELEMENTS, serverUrl, apiKey, } from "./view.js";
import { weatherNow, weatherDetails, weatherForecast } from "./chenge_weather.js";

BUTTONS.NAVI_BUTTONS.forEach(button => button.addEventListener("click", chengeViewBtn))
BUTTONS.FAVORIT_BUTTON.addEventListener("click", checkCity);
BUTTONS.SUBMIT_BUTTON.addEventListener("click", changeWeather);
BUTTONS.DELETE_BUTTON.forEach(button => button.addEventListener("click", deleteCity));
UI_ELEMENTS.FAVORIT_LIST.forEach(city => city.addEventListener("click", getFavoritCity));
const favorit_list = [];

function chengeViewBtn(event) {
    const buttons = Array.from(BUTTONS.NAVI_BUTTONS);
    event.currentTarget.classList.add("aktiv_btn");
    const passiv_btn = buttons.filter(btn => btn !== event.currentTarget);
    passiv_btn.forEach(button => button.classList.remove("aktiv_btn"))

}

function checkCity() {
    let cityName = getName();
    let newArray = [];
    const favoritList = document.querySelectorAll(".enterCity");
    favoritList.forEach(city => newArray.push(city.textContent));
    const favoritCity = newArray.find(city => city === cityName);
    !favoritCity ? addCity(cityName) : "";
}

function addCity(city) {

    const cityName = city;
    const listLocation = document.querySelector(".listLocation");
    const element = `<li class="location"> 
    <button class="enterCity">${cityName}</button>
    <button class="deleteButton"></button></li>`
    listLocation.insertAdjacentHTML("afterbegin", element);
    listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
    listLocation.firstElementChild.firstElementChild.addEventListener("click", getFavoritCity);
    setLocalStorage(cityName);
}

function setLocalStorage(city) {
    const cityName = favorit_list.find(item => item === city);
    if (city !== cityName) {
        favorit_list.push(city);
    }
    localStorage.setItem("list", JSON.stringify(favorit_list));

}

function chengeStoreage() {
    const new_list = localStorage.getItem("list");
    const list = JSON.parse(new_list);
    const city = JSON.parse(localStorage.getItem("city"))
    document.querySelector(".inputWindow").value = city;
    if (localStorage.getItem("list") !== null) {
        list.forEach(item => favorit_list.push(item))
    }
    favorit_list.forEach(item => addCity(item))
    changeWeather()
}



function deleteCity(event) {
    const location = event.currentTarget.parentElement;
    const locationItem = location.firstElementChild.innerHTML;
    const chenged_list = favorit_list.filter(item => item !== locationItem);
    location.remove();
    localStorage.setItem("list", JSON.stringify(chenged_list))
    console.log(chenged_list)
    console.log(locationItem)

}

function getFavoritCity(event) {
    const city = event.currentTarget.textContent;
    document.querySelector(".inputWindow").value = city;
    changeWeather();
}

function getName() {
    const cityName = document.querySelector(".inputWindow").value;
    localStorage.setItem("city", JSON.stringify(cityName));
    return cityName;
}

function creatUrl() {
    const cityName = getName();
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}


function changeWeather(event) {
    if (event) { event.preventDefault(); }
    weatherNow();
    weatherDetails();
    weatherForecast();
}

chengeStoreage();
changeWeather()
export { creatUrl };