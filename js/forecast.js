//Header dropdown events

document.querySelector('.username').onclick = () => {
    document.querySelector('.dropdown_content').style.display = "flex";
}
document.querySelector('.dropdown_content').onmouseleave = () => {
    document.querySelector('.dropdown_content').style.display = "none";
}

//Burger menu activation

document.querySelector('.mobile__burger__container').onclick = () => {
    const burger = document.querySelector('.mobile__burger__container')
    const mobileHeader = document.querySelector('.mobile__header');
    burger.classList.toggle('change')
    if (burger.classList.contains('change') == false) {
        mobileHeader.style.height = "42px";
    } else {
        mobileHeader.style.height = "auto";
    }
}

//Header authentication

function lastUser() {
    const authElem = document.querySelectorAll('.authorization a')
    const lastUser = localStorage.key(0);
    document.querySelector('.username').textContent = lastUser;
    for (let i = 0; i < authElem.length - 4; i++) {
        authElem[i].style.display = "none";
    }
    document.querySelector('.logout').onclick = () => {
        for (let i = 0; i < authElem.length - 4; i++) {
            authElem[i].style.display = "flex";
        }
    }
}
lastUser()

//Log out

document.querySelector('.logout').onclick = (event) => {
    event.preventDefault();
    const authElem = document.querySelectorAll('.authorization a');
    document.querySelector('.dropdown').style.display = "none";
    for (let i = 0; i < authElem.length - 4; i++) {
        authElem[i].style.display = "flex";
    }

}
//Getting forecast data using API OpenWeatherMap

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55155e7e68ef63a6d364bdc4296ab4c6`).then(function (resp) {
            return resp.json()
        }).then(function (data) {
            document.querySelector(`#${city}_temp`).textContent = Math.round(data.main.temp - 273);
            document.querySelector(`#${city}_humidity`).textContent = data.main.humidity + '%';
            document.querySelector(`#${city}_wind`).textContent = data.wind.speed + " m/s";
            document.querySelector(`#${city}_country`).textContent = data.sys.country;
        })
        .catch(function () {

        })
}

//Default cities

getWeather("London");
getWeather("Paris");
getWeather("Moscow");
getWeather('Beijing');
getWeather("Newark");

//Function for search

document.querySelector('.search_input').onkeyup = () => {
    // Declaring variables
    const input = document.querySelector('.search_input');
    let filter = input.value.toUpperCase();
    const menu = document.querySelector('.location_menu');
    let city = document.querySelectorAll('.city');
    // Getting all elements of list and filtering them
    for (i = 0; i < city.length; i++) {
        if (city[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            city[i].style.display = "";
        } else {
            city[i].style.display = "none";
        }
    }

}

//Using by user to add city in personal forecast
function addCity() {
    //Declaring variables

    // this = city name that user selected in search
    let cityName = this.textContent
    let newSlide = document.createElement('div');
    newSlide.className = "slide";
    newSlide.innerHTML = `<div class="overlay">
    <h1 id='${cityName}'>${cityName}</h1>
    <p>Temperature: <span id="${cityName}_temp"></span>&deg;</p>
    <p>Humidity: <span id='${cityName}_humidity'></span></p>
    <p>Wind Speed: <span id="${cityName}_wind"></span></p>
    <p>Country: <span id="${cityName}_country"></span></p>
    </div>
    <img src="/images/${cityName}.jpg" alt="" class="city_picture">
    `

    //Getting info about user and parse it
    // let currentUser = JSON.parse(localStorage.getItem(localStorage.key(0)))

    //Send info to localStorage
    // currentUser.set("cityList", `${cityName}`)
    // JSON.stringify(currentUser)

    //Sending new slide to the end of slider
    document.querySelector('.line').append(newSlide);
    getWeather(`${cityName}`);
    slider();
}

//Setting onclick event at all of slides

for (let i = 0; i < document.querySelectorAll('.city').length; i++) {
    document.querySelectorAll('.city')[i].onclick = addCity;
}

//Slider Function

function slider() {
    //Slider Variables

    const line = document.querySelector('.line');
    let slides = document.querySelectorAll('.slide');
    let sliderWidth = document.querySelector('.slider').offsetWidth;
    let widthArray = [0];
    let lineWidth = 0;
    let offset = 0
    let step = 0;
    let remain = 0;

    //Working with slider

    for (let i = 0; i < slides.length; i++) {
        widthArray.push(slides[i].offsetWidth)
        lineWidth += slides[i].offsetWidth;
    }
    line.style.width = lineWidth + 'px'

    //Setting onclick events on slides

    for (let i = 0; i < slides.length; i++) {
        slides[i].onclick = () => {
            remain = lineWidth - sliderWidth - (offset + widthArray[step])
            if (remain >= 0) {
                offset += widthArray[step]
                line.style.left = -offset + 'px'
            } else {
                line.style.width = -(lineWidth - sliderWidth) + 'px'
                offset = 0;
                step = -1;

            }
            //Reseting variables because of the end of slider

            if (step + 1 == slides.length) {
                step = 0;
                offset = 0
            } else {
                step++
            }
        }
    }
}
slider();