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

// Index functions
window.onload = async function () {
    localStorage.setItem('nextPage', './index.html');
    refreshSign();

    const dic = await fetch("dictionary.json");
	window.dictionary = await dic.json();
	const select = document.getElementById('where_you_lost');
	
	for (const address of dictionary) {
		const optionElement = document.createElement('option');
  		optionElement.value = address;
  		optionElement.text = address;
  		select.appendChild(optionElement);
	}
}

function submitItem(){
    const item = document.getElementById("search_item").value;
    const location = document.getElementById("where_you_lost").value;
    const username = localStorage.getItem("username");

    if((item && item.length > 0) && (location && location.length > 0)){
        localStorage.setItem('item', item);
        localStorage.setItem('location', location);
        localStorage.setItem('nextPage', './submit_lost_item.html');
        localStorage.setItem('fromPage', 'index');   
        if(username){
            window.location.href = "./submit_lost_item.html";
        } else {
            window.location.href = "./login.html";
        }
    } else {
        alert("Please Enter the Above Queries");
    }
}