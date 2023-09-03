const loginForm = document.querySelector("#login-form");
const newMessageForm = document.querySelector("#new-message-form");
const newMessage = document.querySelector("#new-message-btn");

// add events conditionally, since the page may not have the elements
if (newMessageForm) {
  newMessage.addEventListener("click", (e) => {
    newMessageForm.classList.toggle("hide");
  });
  newMessageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = document.querySelector("#message").value;
    if (content) {
      await createNewMessage(content);
    }
    newMessageForm.classList.toggle("hide");
    newMessageForm.reset();
  });
}

async function createNewMessage(content) {
  const response = await fetch("/new-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }), //wrap in object
  });
  console.log("response from server: ", response.status);
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
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
}

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

async function getMessages() {
  const response = await fetch("/messages");
  const messages = await response.json();
  console.log(messages);
  const messagesEl = document.querySelector("#messages");
  messagesEl.innerHTML = "";
  messages.forEach((message) => {
    const messageEl = document.createElement("div");
    // author, content, date
    const authorEl = document.createElement("h3");
    authorEl.innerText = message.user.username;
    const contentEl = document.createElement("p");
    contentEl.innerText = message.content;
    const dateEl = document.createElement("p");
    dateEl.innerText = message.date;
    messageEl.appendChild(authorEl);
    messageEl.appendChild(contentEl);
    messageEl.appendChild(dateEl);
    messagesEl.appendChild(messageEl);
  });
}
