import {
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
} from "./view.js"

favoriteButton.addEventListener("click", addCity);

submitButton.addEventListener("click", changeWeater);

deleteButton.forEach(button => button.addEventListener("click", deleteCity));

favoritList.forEach(city => city.addEventListener("click", getFavoritCity));

// function checkCity() {
//     const cityName = getName()
//     favoritList.forEach(city => { if (city.textContent !== cityName) { console.log(favoriteButton) } })
// }
// checkCity()

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
    const cityName = getName();
    const element = `<li class="location"> 
    <button class="enterCity">${cityName}</button>
    <button class="deleteButton"></button></li>`
    const listLocation = document.querySelector(".listLocation");
    listLocation.insertAdjacentHTML("afterbegin", element);
    listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
    listLocation.firstElementChild.firstElementChild.addEventListener("click", enterCityName);
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
    const url = "http://openweathermap.org/img/wn/"

    response.then(data => {
        const temp = Math.round(data.main.temp) + "&#176;";
        const clouds = `${url}${data.weather[0].icon}@2x.png`;
        const cityName = data.name;
        temperatura.forEach(item => item.innerHTML = temp);
        atmosfereNow.src = clouds;
        city_name.forEach(item => item.innerHTML = cityName);
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
        feels_like.innerHTML = feelsLike;
        clouds.innerHTML = weather;
        sunrise.innerHTML = `Sunrise: ${ sunriseData}`;
        sunset.innerHTML = `Sunset: ${ sunsetData}`;
    })

}

function weaterForecast() {

    const response = responseForecast();
    const optionsDate = { day: "numeric", month: "long" }
    const optionsTime = { hour: "numeric", minute: "numeric" }

    response.then(data => data.list).then(data => {
        const url = "http://openweathermap.org/img/wn/"
        const forecast = document.querySelector(".infoWeatherForecast")
        document.querySelector(".forecast").remove()
        const div = ` <div class="forecast">
        <div class="forecastWindow">
           <li class="date">${(new Date(data[0].dt_txt))
               .toLocaleString('EN-en', optionsDate)}</li>   
           <li class="time">${(new Date(data[0].dt_txt))
               .toLocaleString('ru', optionsTime)}</li>
           <li class="temper">Temperature:${Math.round(data[0].main.temp)}&#176;</li>
           <li class="feelsLike">Feels Like: ${Math.round(data[0].main.feels_like)}&#176;</li>
           <li class="weatherconditions ">${data[0].weather[0].main}
           <img class="img"src="${url}${data[0].weather[0].icon}@2x.png"></li>
        </div>
        <div class="forecastWindow">
           <li class="date">${(new Date(data[1].dt_txt))
               .toLocaleString('EN-en', optionsDate)}</li>   
           <li class="time">${(new Date(data[1].dt_txt))
               .toLocaleString('ru', optionsTime)}</li>
           <li class="temper">Temperature:${Math.round(data[1].main.temp)}&#176;</li>
           <li class="feelsLike">Feels Like: ${Math.round(data[1].main.feels_like)}&#176;</li>
           <li class="weatherconditions">${data[1].weather[0].main}
           <img class="img"src="${url}${data[1].weather[0].icon}@2x.png"></li>
        </div>
        <div class="forecastWindow">
           <li class="date">${(new Date(data[2].dt_txt))
               .toLocaleString('EN-en', optionsDate)}</li>   
           <li class="time">${(new Date(data[2].dt_txt))
               .toLocaleString('ru', optionsTime)}</li>
           <li class="temper">Temperature:${Math.round(data[2].main.temp)}&#176;</li>
           <li class="feelsLike">Feels Like: ${Math.round(data[2].main.feels_like)}&#176;</li>
           <li class="weatherconditions">${data[2].weather[0].main}
           <img class="img"src="${url}${data[2].weather[0].icon}@2x.png" alt=""></li>
        </div>
        <div class="forecastWindow">
           <li class="date">${(new Date(data[3].dt_txt))
               .toLocaleString('EN-en', optionsDate)}</li>   
           <li class="time">${(new Date(data[3].dt_txt))
               .toLocaleString('ru', optionsTime)}</li>
           <li class="temper">Temperature:${Math.round(data[3].main.temp)}&#176;</li>
           <li class="feelsLike">Feels Like: ${Math.round(data[3].main.feels_like)}&#176;</li>
           <li class="weatherconditions">${data[3].weather[0].main}
           <img class="img"src="${url}${data[3].weather[0].icon}@2x.png" alt=""></li>
                   </div>
   </div>`;
        forecast.insertAdjacentHTML("beforeend", div);
    });


}