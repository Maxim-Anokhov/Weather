const submitButton = document.querySelector(".header");
const favoriteButton = document.querySelector(".heart");
const deleteButton = document.querySelectorAll(".deleteButton")
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
// const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
const apiKey = "97f36208f41daeec8c857deb48d7e06c"
const temperatura = document.querySelectorAll(".temp");
const city_name = document.querySelectorAll(".city_name");
const atmosfereNow = document.querySelector(".atmosfere");
const feels_like = document.querySelector(".feels");
const clouds = document.querySelector(".clouds");
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const favoritList = document.querySelectorAll(".enterCity");
const dates = document.querySelectorAll(".date")
export {
    favoritList,
    deleteButton,
    submitButton,
    serverUrl,
    apiKey,
    temperatura,
    city_name,
    atmosfereNow,
    favoriteButton,
    feels_like,
    clouds,
    sunrise,
    sunset,
    dates
};