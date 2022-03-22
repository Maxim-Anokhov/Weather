import { UI_ELEMENTS, } from "./view.js";
import { changeWeather, addCity } from "./main.js";
const favorit_list = [];

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

function startPage() {
    document.querySelector(".nowBtn").classList.add("aktiv_btn")
    UI_ELEMENTS.TABS.forEach(item => item.classList.add("infoWeatherPassiv"))
    document.querySelector(".infoWeatherNow").classList.add("infoWeatherAktiv")
}
export { setLocalStorage, chengeStoreage, startPage }