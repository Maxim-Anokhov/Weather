import { BUTTONS, UI_ELEMENTS, serverUrl, apiKey, } from "./view.js"

BUTTONS.FAVORIT_BUTTON.addEventListener("click", checkCity);
BUTTONS.SUBMIT_BUTTON.addEventListener("click", changeWeater);
BUTTONS.DELETE_BUTTON.forEach(button => button.addEventListener("click", deleteCity));
UI_ELEMENTS.FAVORIT_LIST.forEach(city => city.addEventListener("click", getFavoritCity));

function checkCity() {
    let cityName = getName()
    let newArray = []
    const favoritList = document.querySelectorAll(".enterCity")
    favoritList.forEach(city => newArray.push(city.textContent))
    const favoritCity = newArray.find(city => city === cityName);
    console.log(favoritCity);
    !favoritCity ? addCity() : "";
}


function getFavoritCity(event) {
    const city = event.currentTarget.textContent;
    document.querySelector(".inputWindow").value = city;
    changeWeater();
}

function getName() {
    const cityName = document.querySelector(".inputWindow").value;

    return cityName;
}

function addCity() {

    const cityName = getName()
    const element = `<li class="location"> 
    <button class="enterCity">${cityName}</button>
    <button class="deleteButton"></button></li>`
    const listLocation = document.querySelector(".listLocation");
    listLocation.insertAdjacentHTML("afterbegin", element);
    listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
    listLocation.firstElementChild.firstElementChild.addEventListener("click", getFavoritCity);

}

function deleteCity(event) {
    const location = event.currentTarget.parentElement;
    location.remove();
}

function creatUrl() {
    const cityName = getName();
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

function getResponse() {
    const url = creatUrl();
    return fetch(url).then(response => response.json());
}

function responseForecast() {
    const serverUrl = "https://api.openweathermap.org/data/2.5/forecast"
    const response = getResponse();
    return response.then(data => data.coord)
        .then(data => fetch(`${serverUrl}?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&units=metric`))
        .then(data => data.json())
}

function changeWeater() {
    weaterNow();
    weaterDetails();
    weaterForecast();
}

function weaterNow() {
    const response = getResponse();
    const url = "https://openweathermap.org/img/wn/"

    response.then(data => {
        const temp = Math.round(data.main.temp) + "&#176;";
        const clouds = `${url}${data.weather[0].icon}@2x.png`;
        const cityName = data.name;
        UI_ELEMENTS.TEMPERATURA.forEach(item => item.innerHTML = temp);
        UI_ELEMENTS.ATMOSFERE_NOW.src = clouds;
        UI_ELEMENTS.CITY_NAME.forEach(item => item.innerHTML = cityName);
    })
}

function weaterDetails() {
    const response = getResponse();
    const options = { hour: "numeric", minute: "numeric" }

    response.then(data => {
        const feelsLike = `Feelse like: ${data.main.feels_like }&#176;`;
        const weather = `Weather: ${data.weather[0].main}`;
        const sunriseData = new Date(data.sys.sunrise).toLocaleTimeString('ru-RU', options);
        const sunsetData = new Date(data.sys.sunset).toLocaleTimeString('UTC', options);
        UI_ELEMENTS.FEELS_LIKE.innerHTML = feelsLike;
        UI_ELEMENTS.CLOUDS.innerHTML = weather;
        UI_ELEMENTS.SUNRISE.innerHTML = `Sunrise: ${ sunriseData}`;
        UI_ELEMENTS.SUNSET.innerHTML = `Sunset: ${ sunsetData}`;
    })
}

function weaterForecast() {

    const response = responseForecast();
    const optionsDate = { day: "numeric", month: "long" }
    const optionsTime = { hour: "numeric", minute: "numeric" }
    const url = "https://openweathermap.org/img/wn/";
    const forecast = document.querySelector(".forecast");
    const deleteForecast = document.querySelectorAll(".forecastWindow");
    deleteForecast.forEach(forecast => forecast.remove());
    let parametrsArray = []
    response.then(data => data.list).then(data => {
        for (let order = 0; order < 10; order++) {

            let parametrs
            parametrsArray.push(parametrs = {
                date: (new Date(data[order].dt_txt)).toLocaleString('EN-en', optionsDate),
                time: (new Date(data[order].dt_txt)).toLocaleString('ru', optionsTime),
                temperature: Math.round(data[order].main.temp),
                filsLike: Math.round(data[order].main.feels_like),
                condition: data[order].weather[0].main,
                img: data[order].weather[0].icon,
            })
        }
        parametrsArray.forEach(parametrs => {
            const div = `<div class="forecastWindow">
                           <li class="date">${parametrs.date}</li>   
                           <li class="time">${parametrs.time}</li>
                           <li class="temper">Temperature:${parametrs.temperature}&#176;</li>
                           <li class="feelsLike">Feels Like: ${parametrs.feelsLike}&#176;</li>
                           <li class="weatherconditions ">${parametrs.condition}
                           <img class="img"src="${url}${parametrs.img}@2x.png"></li>
                        </div>`;
            forecast.insertAdjacentHTML("beforeend", div);
        })
    });
}