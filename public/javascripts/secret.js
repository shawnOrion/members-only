const show = document.getElementById("show");
const hide = document.getElementById("hide");
const passcode = document.getElementById("passcode");

show.addEventListener("click", function () {
  passcode.classList.toggle("hide");
});
