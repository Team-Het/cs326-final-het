'use strict';

// NavBar functions
function goHome(){
    window.location.href = "./index.html";
}

function profile(){
    // to be done
}

// Index functions
// Fake data for testing remove when go to production
window.onload = async function () {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (username && email) {
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;
    }
    window.username = username;
    
}

function usernameKeyup(){
    const button = document.getElementById('save_changes');
    const username = document.getElementById('username').value;
    if(window.username !== username) {
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
    }
}