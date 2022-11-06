// Placeholder for RESTful API

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