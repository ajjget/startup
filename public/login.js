function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("username", nameEl.value);
    console.log(nameEl.value);
  }