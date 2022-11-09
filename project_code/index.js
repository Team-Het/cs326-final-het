// Placeholder code for RESTful API

'use strict';
async function getStars() {
    // DO THIS
    // console.log("getStars is called");
    const starsDiv = document.getElementById('star_count');
    const url = 'https://api.github.com/repos/' + document.getElementById('repo').value;
    // console.log("url = " + url);
    const response = await fetch(url);
    if (response.ok) {
        const respJSON = await response.json();
        starsDiv.innerHTML = respJSON.watchers_count;
    } else {
        starsDiv.innerHTML = 'an error has occured';
    }
}

// NavBar functions
function goHome(){
    window.location.href = "./index.html";
}

function profile(){
    // to be done
}

// Index functions
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
        window.location.href = "./submit_found_item.html";
    } else {
        alert("Please Enter the Above Queries");
    }
}
