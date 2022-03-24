import { changeWeather, addFavoritCity, favorit_list } from "./main.js";


function favoritCityes(city) {

    const cityes_list = []
    favorit_list.add(city);
    favorit_list.forEach(city => cityes_list.push(city));
    localStorage.setItem("list", JSON.stringify(cityes_list));
}

function currentCity(city) {
    localStorage.setItem("city", JSON.stringify(city));
}

function chengeFavoritCityes() {
    const new_list = localStorage.getItem("list");
    const list = JSON.parse(new_list);
    const currentCity = JSON.parse(localStorage.getItem("city"));
    if (list != false) {
        list.forEach(item => favorit_list.add(item));
        favorit_list.forEach(item => addFavoritCity(item));
        changeWeather();
        return currentCity;
    }
}
export { favoritCityes, chengeFavoritCityes, currentCity };