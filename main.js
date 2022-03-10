import { submitButton, serverUrl, apiKey, temperatura, city_name, atmosfereNow, favoriteButton, feels_like, clouds, sunrise, sunste, } from "./view.js"
favoriteButton.addEventListener("click", addCity)
submitButton.addEventListener("click", changeWeater);
let deleteButton = document.querySelectorAll(".deleteButton")

function enterCityName(event) {
    const city = event.currentTarget.innerHTML
    city = getName()
}

function getName() {
    const cityName = document.querySelector(".inputWindow").value;
    console.log(cityName)
    return cityName

}

function addCity() {
    const cityName = getName()
    const listLocation = document.querySelector(".listLocation");
    listLocation.insertAdjacentHTML("afterbegin", `<li class="location"> <button class="enterCity">${cityName}</button><button class="deleteButton"></button></li>`)
    listLocation.firstElementChild.lastElementChild.addEventListener("click", deleteCity);
}
deleteButton.forEach(button => button.addEventListener("click", deleteCity))



function deleteCity(event) {
    const location = event.currentTarget.parentElement;
    location.remove()

}


function creatUrl() {
    const cityName = getName()
    console.log(cityName)
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

function changeWeater() {
    const url = creatUrl()
    const responseServ = fetch(url).then(response => response.json())
    responseServ.then(data => console.log(data))
    responseServ.then(data => city_name.forEach(item => item.innerHTML = data.name));
    responseServ.then(data => temperatura.forEach(item => item.innerHTML = Math.round(data.main.temp) + "&#176;"));
    responseServ.then(data => atmosfereNow.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    responseServ.then(data => feels_like.innerHTML = `Feelse like: ${data.main.feels_like }&#176;`);
    responseServ.then(data => clouds.innerHTML = `Weather: ${data.weather[0].main}`);
    responseServ.then(data => sunrise.innerHTML = `Sunrise: ${data.sys.sunrise}`)
    responseServ.then(data => sunste.innerHTML = `Sunset: ${data.sys.sunset}`)
}