'use strict';

// NavBar functions
function goLogin(){
    window.location.href = "./login.html";
}

function signOut() {
	fetch(window.location.origin + '/logout')
    .then((response)=>response.json())
    .then((data)=>{});
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    refreshSign();
}

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

function goSubmit(){
    const username = localStorage.getItem('username');
    if(username){
        window.location.href = "./submit_lost_item.html";
    } else {
        localStorage.setItem('nextPage', 'submit_lost_item.html');
        window.location.href = "./login.html";
    }
}

window.onload = async function () {
    refreshSign();
};