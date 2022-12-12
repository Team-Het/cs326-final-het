'use strict';

// NavBar functions
function goLogin(){
    window.location.href = "./login.html";
}

function signOut() {
	fetch(window.location.origin + '/logout')
    .then((response)=>response.json())
    .then((data)=>{});
    // console.log("in signOut");
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
    if(username){
        signIn.classList.add('hidden');
        signOut.classList.remove('hidden');
    } else {
        signIn.classList.remove('hidden');
        signOut.classList.add('hidden');
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

// Index functions
window.onload = async function () {
    localStorage.setItem('nextPage', './index.html');
    refreshSign();
}

function submitItem(){
    const item = document.getElementById("search_item").value;
    const location = document.getElementById("search_location").value;
    if((item && item.length > 0) && (location && location.length > 0)){
        localStorage.setItem('item', item);
        localStorage.setItem('location', location);
        localStorage.setItem('nextPage', './submit_lost_item.html');
        localStorage.setItem('fromPage', 'index')
        window.location.href = "./submit_lost_item.html";
    } else {
        alert("Please Enter the Above Queries");
    }
}

// function submitLostItem(){
//     const item = document.getElementById("search_item").value;
//     const location = document.getElementById("search_location").value;
//     if((item && item.length > 0) && (location && location.length > 0)){
//         localStorage.setItem('item', item);
//         localStorage.setItem('location', location);
//         localStorage.setItem('fromPage', 'index')
//         window.location.href = "./submit_lost_item.html";
//     } else {
//         alert("Please Enter the Above Queries");
//     }
// }

// function submitFoundItem(){
//     const item = document.getElementById("search_item").value;
//     const location = document.getElementById("search_location").value;
//     if((item && item.length > 0) && (location && location.length > 0)){
//         localStorage.setItem('item', item);
//         localStorage.setItem('location', location);
//         localStorage.setItem('fromPage', 'index')
//         window.location.href = "./submit_lost_item.html";
//     } else {
//         alert("Please Enter the Above Queries");
//     }
// }
