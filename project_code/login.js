// Navbar functions
function goHome(){
    window.location.href = "./index.html";
}

function goProfile(){
    const username = localStorage.getItem('username');
    if(username){
        window.location.href = "./profile.html";
    } else {
        localStorage.setItem('nextPage', 'profile.html');
        window.location.href = "./login.html";
    }
}

function goSubmit(){
    const username = localStorage.getItem('username');
    if(username){
        window.location.href = "./submit_lost_item.html";
    } else {
        localStorage.setItem('nextPage', 'submit_lost_item.html');
        window.location.href = "./login.html";
    }
}

// Login functions
async function login() {
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // const user = { "id": name, "user_name": password };
    console.log("login");
    if ((name && name.length > 0) && (password && password.length > 0)) {
        const response = await fetch(window.location.origin + '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                username: name,
                password: password,
            })
        });

        console.log(response);
        if (response.ok) {
            if (response.redirected) {
                alert('Incorrect Username or Password');
                return;
            }
            const resp = await response.json();
            console.log(resp);
            if (resp.status === 'success') {
                localStorage.setItem('username', name);
                localStorage.setItem("email", resp.email);
                const nextPage = localStorage.getItem('nextPage');
                if (nextPage) {
                    localStorage.removeItem('nextPage');
                    window.location.href = nextPage;
                } else {
                    window.location.href = "./index.html";
                }
            }
        } else {
            alert('Server Error');
        }
    } else {
        alert("Server Error");
    }
}

function createAccount(){
    window.location.href = "./create_account.html";
}