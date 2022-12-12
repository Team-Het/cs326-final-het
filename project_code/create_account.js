// Navbar functions
function goHome(){
    window.location.href = "./index.html";
}

function refreshSign(){
    const username = localStorage.getItem("username");
    const signIn = document.getElementById("signIn");
    const signOut = document.getElementById("signOut");
    const loginName = document.getElementById("loginName");
    if(username){
        signIn.classList.add('hidden');
        signOut.classList.remove('hidden');
        loginName.innerHTML = 'Signed in as ' + username;
    } else {
        signIn.classList.remove('hidden');
        signOut.classList.add('hidden');
        loginName.innerHTML = '';
    }
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

// Create Account functions
async function signUp(){
    console.log("sign up");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if ((username && username.length > 0) && (password && password.length > 0) && (email && email.length > 0)) {
        const response = await fetch(window.location.origin + '/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        });
        console.log(response);
        if (response.ok) {
            const resp = await response.json();
            console.log(resp);
            if (resp.status === 'success') {
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                const nextPage = localStorage.getItem('nextPage');
                if (nextPage) {
                    localStorage.removeItem('nextPage');
                    window.location.href = nextPage;
                } else {
                    window.location.href = "./index.html";
                }
            } else if(resp.status === 'failed' && resp.reason === 'user exists') {
                alert('Username already exists please enter different username');
            } else {
                alert('Error Proccessing Data');
            }  
        } else {
            alert('Server Error');
        }
    }
}