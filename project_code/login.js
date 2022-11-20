// Navbar functions
function goHome(){
    window.location.href = "./index.html";
}

function goProfile(){
    window.location.href = "./profile.html";
}

// Login functions
async function login() {
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // const user = { "id": name, "user_name": password };
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
                window.location.href = response.url;
            }
            const resp = await response.json();
            console.log(resp);
            if (resp.status === 'success') {
                const nextPage = localStorage.getItem('nextPage');
                if (nextPage) {
                    localStorage.removeItem('nextPage');
                    window.location.href = './post_detail.html';
                } else {
                    window.location.href = "./index.html";
                }
            } else {
                alert('Incorrect Username or Password');
            }
        } else {
            alert('Server Error');
        }
    
        localStorage.setItem('username', name);
    } else {
        alert("Please enter valid username and password. If you don't have an account, please create one.");
    }
}

function createAccount(){
    window.location.href = "./create_account.html";
}