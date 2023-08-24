// sellect form
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // select password
  const password = document.querySelector("#password");
  // select confirm password
  const confirmPassword = document.querySelector("#confirmPassword");

  if (password.value !== confirmPassword.value) {
    // show the error message
    return;
  }
  const data = {
    name: document.querySelector("#name").value,
    password: password.value,
    email: document.querySelector("#email").value,
    status: false,
  };
  await createNewUser(data);
});

// data has fields which match the User model
async function createNewUser(data) {
  console.log("creating a user");
  // makes a fetch post request to the server
  const response = await fetch("/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("response from server", response);
}
