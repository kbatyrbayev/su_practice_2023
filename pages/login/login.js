const isAuth = localStorage.getItem("isAuth");
if (isAuth) {
  location.href = "../pages/main/main.html";
}

const user = {
    login: 'admin',
    password: 'admin'
};
let loginForm = document.getElementById("loginForm");
let username = document.getElementById("username");
let password = document.getElementById("password");

username.addEventListener('input', onInput);
password.addEventListener('input', onInput);

function onInput(event) {
    let val = event.target.value;
    if (val.length === 0) {
        addError(this);
    } else {
        removeError(this);
    }
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (username.value === user.login && password.value === user.password) {
        localStorage.setItem('isAuth', 'true');
        location.href = '../main/main.html';
    } else {
        addError(username);
        addError(password);
    }
});

function addError(element) {
    element.classList.add('error');
}

function removeError(element) {
    element.classList.remove('error');
}