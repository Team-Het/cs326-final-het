'use strict';

// NavBar functions
function signOut() {
	fetch(window.location.origin + '/logout')
    .then((response)=>response.json())
    .then((data)=>{});
    // console.log("in signOut");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    window.location.href = "./index.html";
}

function goHome(){
    window.location.href = "./index.html";
}

function goProfile(){
    const username = localStorage.getItem('username');
    if(username){
        window.location.href = "./profile.html";
    } else {
        window.location.href = "./login.html";
    }
}

// Index functions
window.onload = async function () {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (username) {
        document.getElementById('username').innerHTML = username;
    }
    if (email){
        document.getElementById('email').value = email;
    }
}

function inputKeyup() {
    const button = document.getElementById('save_changes');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const currentEmail = localStorage.getItem("email");
    if(currentEmail && currentEmail !== email || password && password.length > 0) {
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
    }
}

async function saveChanges(){
    const email = document.getElementById('email').value;
    const name = document.getElementById("username").innerHTML;
    const password = document.getElementById("password").value;
    // const currentPass = document.getElementById("currentPass").value;
    // const newPass = document.getElementById("newPass").value;
    // const confirmPass = document.getElementById("confirmPass").value;
    console.log("save changes");
    if ((password && password.length > 0) || (email && email.length > 0)) {
        const response = await fetch(window.location.origin + '/user/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                username: name,
                password: password.length > 0 ? password : undefined,
                email: email,
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
                localStorage.setItem("email", email);
                alert('Changes Saved Successfully');
            } else {
                alert('Failed to Save');
            }
        } else {
            alert('Server Error');
        }
    } else {
        alert("Server Error");
    }
}

async function deleteUser() {
    let res = confirm("Do you REALLY want to delete your account?")
    
    if(res){
        const response = await fetch(window.location.origin + '/user/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                username: localStorage.getItem('username'),
            })
        });
        console.log("delete");
        if (response.ok) {
            const resp = await response.json();
            console.log(resp);
            if (resp.status === 'success') {
                alert('Account Successfully Deleted');
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                window.location.href = './index.html';
            } else {
                alert('error! one');
            }
        } else {
            alert('error! two');
        }
    }
    else{
        alert('Account is NOT Deleted')
    }
	
}