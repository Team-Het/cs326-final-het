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
    localStorage.setItem('username', 'Kelly');
    localStorage.setItem('email', 'kechung@umass.edu');
    localStorage.setItem('userId', '12345');
    localStorage.setItem('host', window.location.origin);
    // localStorage.setItem('host', 'https://umass-lost-and-found.herokuapp.com'); 
}

function submitLostItem(){
    const item = document.getElementById("search_item").value;
    const location = document.getElementById("search_location").value;
    if((item && item.length > 0) && (location && location.length > 0)){
        localStorage.setItem('item', item);
        localStorage.setItem('location', location);
        localStorage.setItem('fromPage', 'index')
        window.location.href = "./submit_lost_item.html";
    } else {
        alert("Please Enter the Above Queries");
    }
}

function submitFoundItem(){
    const item = document.getElementById("search_item").value;
    const location = document.getElementById("search_location").value;
    if((item && item.length > 0) && (location && location.length > 0)){
        localStorage.setItem('item', item);
        localStorage.setItem('location', location);
        localStorage.setItem('fromPage', 'index')
        window.location.href = "./submit_found_item.html";
    } else {
        alert("Please Enter the Above Queries");
    }
}
