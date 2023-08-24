const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  console.log("submitting form");
  e.preventDefault();

  // get the email and password
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const data = {
    username: email,
    password,
  };
  await loginUser(data);
  window.location.reload();
});

async function loginUser(userData) {
  console.log(userData);
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  console.log("response from server", response);
}
