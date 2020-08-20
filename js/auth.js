"use strict"
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
document.querySelector('.login__button').onclick = (event) => {

    event.preventDefault()
    let out = ''
    const loginValue = document.querySelector('.login').value;
    const passwordValue = document.querySelector('.login__password').value;
    let currentUser = JSON.parse(localStorage.getItem(loginValue))
    if (passwordValue == '') {
        out = 'Write your password and login'
    } else if (localStorage.getItem(loginValue) == null) {
        out = "Password or login is incorrect"
    } else if (currentUser.password == passwordValue) {
        document.querySelector('.authorization').innerHTML = `<a>${loginValue}</a>`
        window.location.href = "/forecast.html";
    }
    document.querySelector('.errors').textContent = out;
}