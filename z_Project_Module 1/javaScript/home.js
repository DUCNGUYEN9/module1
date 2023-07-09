// check login
function checkLogin() {
  let email = localStorage.getItem("userLogin");
  if (email == null) {
    window.location.href = "../Login.html";
  }
}
let logOut = document.getElementById("logOut");
logOut.addEventListener("click", function () {
  localStorage.removeItem("userLogin");
  window.location.href = "../Login.html";
});

// // modal logOut
// const myModal = document.getElementById("myModal");
// const myInput = document.getElementById("myInput");

// myModal.addEventListener("shown.bs.modal", () => {
//   myInput.focus();
// });
document.onload = checkLogin();
