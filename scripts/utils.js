export function checkAuth() {
  const isAuth = localStorage.getItem("isAuth");
  if (isAuth) {
    location.href = "//" + window.location.host + "/pages/main/main.html";
  } else {
    location.href = "//" + window.location.host + "/pages/login/login.html";
  }
}
