import { changeWeather, addFavoritCity, favorit_list } from "./main.js";
// import Cookies from "js-cookie";

function favoritCityes(city) {
    favorit_list.add(city);
    localStorage.setItem("list", JSON.stringify([...favorit_list]));
}

function currentCity(city) {
    localStorage.setItem("city", JSON.stringify(city));
    // Cookies.set('city', city);
    // document.cookie = `${city}; max-age = 3600`;

}

function chengeFavoritCityes() {
    const list = JSON.parse(localStorage.getItem("list"));
    const currentCity = JSON.parse(localStorage.getItem("city"));
    if (list != undefined) {
        list.forEach(item => favorit_list.add(item));
        favorit_list.forEach(item => addFavoritCity(item));
        changeWeather();
        return currentCity;
    }
}
export { favoritCityes, chengeFavoritCityes, currentCity };