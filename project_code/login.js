// Navbar functions
function goHome(){
    window.location.href = "./index.html";
}

function goProfile(){
    window.location.href = "./profile.html";
}

// Login functions
function login() {
    const name = document.getElementById("login_name").value;
    const password = document.getElementById("password").value;
    // const user = { "id": name, "user_name": password };
    //Should we check if the username exists and password matches??
    if ((name && name.length > 0) && (password && password.length > 0)) {
        localStorage.setItem('login_name', name);
        localStorage.setItem('password', password);
        localStorage.setItem('fromPage', 'login');
        window.location.href = "./index.html";
    } else {
        alert("Please enter valid username and password. If you don't have an account, please create one.");
    }
}

function createAccount(){
    window.location.href = "./create_account.html";
}