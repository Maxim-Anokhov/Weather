import { apiKey, UI_ELEMENTS } from "./view.js";
import { creatUrl } from "./main.js";

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

function weatherNow() {
    const response = getResponse();
    const url = "https://openweathermap.org/img/wn/";

    try {
        response.then(data => {
            const temp = Math.round(data.main.temp) + "&#176;";
            const clouds = `${url}${data.weather[0].icon}@2x.png`;
            const cityName = data.name;
            UI_ELEMENTS.TEMPERATURA.forEach(item => item.innerHTML = temp);
            UI_ELEMENTS.ATMOSFERE_NOW.src = clouds;
            UI_ELEMENTS.CITY_NAME.forEach(item => item.innerHTML = cityName);
        })
    } catch { alert("invalid name") }
}

function weatherDetails() {
    const response = getResponse();
    const options = { hour: "numeric", minute: "numeric" }

    response.then(data => {
        const feelsLike = `Feelse like:${ Math.round(data.main.feels_like) }&#176;`;
        const weather = `Weather: ${data.weather[0].main}`;
        const sunriseData = new Date(data.sys.sunrise).toLocaleTimeString('ru-RU', options);
        const sunsetData = new Date(data.sys.sunset).toLocaleTimeString('UTC', options);
        UI_ELEMENTS.FEELS_LIKE.innerHTML = feelsLike;
        UI_ELEMENTS.CLOUDS.innerHTML = weather;
        UI_ELEMENTS.SUNRISE.innerHTML = `Sunrise: ${ sunriseData}`;
        UI_ELEMENTS.SUNSET.innerHTML = `Sunset: ${ sunsetData}`;
    })
}

function weatherForecast() {
    const response = responseForecast();
    const optionsDate = { day: "numeric", month: "long" };
    const optionsTime = { hour: "numeric", minute: "numeric" };
    const url = "https://openweathermap.org/img/wn/";
    const forecast = document.querySelector(".forecast");
    const deleteForecast = document.querySelectorAll(".forecastWindow");
    deleteForecast.forEach(forecast => forecast.remove());
    let parametrsArray = [];
    response.then(data => data.list).then(data => {
        for (let order = 0; order < 10; order++) {

            let parametrs
            parametrsArray.push(parametrs = {
                date: (new Date(data[order].dt_txt)).toLocaleString('EN-en', optionsDate),
                time: (new Date(data[order].dt_txt)).toLocaleString('ru', optionsTime),
                temperature: Math.round(data[order].main.temp),
                feelsLike: Math.round(data[order].main.feels_like),
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
export { weatherNow, weatherDetails, weatherForecast, };