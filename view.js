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
BUTTONS.NAVI_BUTTONS.forEach(button => button.addEventListener("click", chengingTabs))

function chengingTabs(event) {
    const buttons = Array.from(BUTTONS.NAVI_BUTTONS);
    const index_button = buttons.findIndex(id => id == event.currentTarget);
    const tabs = Array.from(UI_ELEMENTS.TABS);
    const activ_tab = tabs[index_button];
    const passiv_tabs = tabs.filter(item => item !== activ_tab);
    const passiv_buttons = buttons.filter(btn => btn !== event.currentTarget);
    activ_tab.classList.add("infoWeatherAktiv");
    passiv_tabs.forEach(item => item.classList.remove("infoWeatherAktiv"))
    event.currentTarget.classList.add("aktiv_btn");
    passiv_buttons.forEach(button => button.classList.remove("aktiv_btn"))

}

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = "97f36208f41daeec8c857deb48d7e06c"
export { BUTTONS, UI_ELEMENTS, serverUrl, apiKey, };