import { favoritList, deleteButton, submitButton, serverUrl, apiKey, temperatura, city_name, atmosfereNow, favoriteButton, feels_like, clouds, sunrise, sunset, } from "./view.js"
favoriteButton.addEventListener("click", addCity)
submitButton.addEventListener("click", changeWeater);
deleteButton.forEach(button => button.addEventListener("click", deleteCity))
favoritList.forEach(city => city.addEventListener("click", enterCityName))


function enterCityName(event) {
    const city = event.currentTarget.textContent;
    document.querySelector(".inputWindow").value = city;
}

function getName() {
    const cityName = document.querySelector(".inputWindow").value;
    return cityName
}

function addCity() {
    const cityName = getName()
    const element = `<li class="location"> <button class="enterCity">${cityName}</button><button class="deleteButton"></button></li>`
    const listLocation = document.querySelector(".listLocation");
    listLocation.insertAdjacentHTML("afterbegin", element)
    listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
    listLocation.firstElementChild.firstElementChild.addEventListener("click", enterCityName)
}

function deleteCity(event) {
    const location = event.currentTarget.parentElement;
    location.remove()
}

function creatUrl() {
    const cityName = getName()
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

function changeWeater() {
    const url = creatUrl()
    const respServ = fetch(url).then(response => response.json());
    let options = { hour: "numeric", minute: "numeric" }
    respServ.then(data => city_name.forEach(item => item.innerHTML = data.name));
    respServ.then(data => temperatura.forEach(item => item.innerHTML = Math.round(data.main.temp) + "&#176;"));
    respServ.then(data => atmosfereNow.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    respServ.then(data => feels_like.innerHTML = `Feelse like: ${data.main.feels_like }&#176;`);
    respServ.then(data => clouds.innerHTML = `Weather: ${data.weather[0].main}`);
    respServ.then(data => new Date(data.sys.sunrise))
        .then(data => data.toLocaleTimeString('ru-RU', options))
        .then(data => sunrise.innerHTML = `Sunrise: ${data}`)
    respServ.then(data => new Date(data.sys.sunset))
        .then(data => data.toLocaleTimeString('UTC', options))
        .then(data => sunset.innerHTML = `Sunset: ${data}`)

}