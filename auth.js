document.querySelector('.login__button').onclick = (event) => {

    event.preventDefault()

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