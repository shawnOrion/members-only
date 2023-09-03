const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const passcode = document.querySelector("#passcode").value;
  if (passcode) {
    await joinClub(passcode);
  }
});

async function joinClub(passcode) {
  try {
    console.log("joining club...");
    const response = await fetch("/join-club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passcode }),
    });
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
}
