const BUTTONS = {
    SUBMIT_BUTTON: document.querySelector(".header"),
    FAVORIT_BUTTON: document.querySelector(".heart"),
    DELETE_BUTTON: document.querySelectorAll(".deleteButton"),
    NAVI_BUTTONS: document.querySelectorAll(".navi_btn"),
}
const UI_ELEMENTS = {
    TEMPERATURA: document.querySelectorAll(".temp"),
    CITY_NAME: document.querySelectorAll(".city_name"),
    ATMOSFERE_NOW: document.querySelector(".atmosfere"),
    FEELS_LIKE: document.querySelector(".feels"),
    CLOUDS: document.querySelector(".clouds"),
    SUNRISE: document.querySelector('.sunrise'),
    SUNSET: document.querySelector('.sunset'),
    FAVORIT_LIST: document.querySelectorAll(".enterCity"),
    DATES: document.querySelectorAll(".date"),
    TABS: document.querySelectorAll(".infoWeather"),
}
const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = "97f36208f41daeec8c857deb48d7e06c"
export { BUTTONS, UI_ELEMENTS, serverUrl, apiKey, };