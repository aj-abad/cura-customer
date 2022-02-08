const {userStatus} = JSON.parse(localStorage.getItem("user") ?? "{}");
switch (userStatus) {
  case 1:
    history.replaceState(null, null, '/home');
    break;
  case 2:
    history.replaceState(null, null, '/account/welcome');
    break;
  default:
    history.replaceState(null, null, '/');
}