const isAuth = localStorage.getItem('isAuth');
if (isAuth) {
    location.href = '../pages/main/main.html';
} else {
    location.href = '../pages/login/login.html';
}