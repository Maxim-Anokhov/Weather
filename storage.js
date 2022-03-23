import { changeWeather, addFavoritCity, } from "./main.js";
const favorit_list = [];

function setLocalStorage(city) {

    const favoritCityName = favorit_list.find(item => item === city);
    const currentCity = document.querySelector(".cityName").innerHTML;
    if (city !== favoritCityName) {
        favorit_list.push(city);
    }
    localStorage.setItem("list", JSON.stringify(favorit_list));
    localStorage.setItem("city", JSON.stringify(currentCity));

}

function chengeLocalStoreage() {
    const new_list = localStorage.getItem("list");
    const list = JSON.parse(new_list);
    const currentCity = JSON.parse(localStorage.getItem("city"));

    if (localStorage.getItem("list") !== null) {
        list.forEach(item => favorit_list.push(item));
    }
    favorit_list.forEach(item => addFavoritCity(item));
    changeWeather();
    return currentCity;
}

export { setLocalStorage, chengeLocalStoreage, favorit_list }