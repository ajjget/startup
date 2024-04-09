function loadUsername() {
    let username = localStorage.getItem('username');
    const usernameEl = document.querySelector('#username_place');

    if (username) {
        usernameEl.textContent = `${username} logged in`;
    }
    else {
        usernameEl.textContent = "Please login!";
    }
}

loadUsername();