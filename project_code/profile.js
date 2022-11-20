'use strict';

// NavBar functions
function goHome(){
    window.location.href = "./index.html";
}

function goProfile(){
    window.location.href = "./profile.html";
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

function usernameKeyup() {
    const button = document.getElementById('save_changes');
    const username = document.getElementById('username').value;
    if(window.username !== username) {
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
    }
}

async function deleteUser() {
	const response = await fetch(window.location.origin + '/user/delete', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
            userId: localStorage.getItem('userId'),
		})
	});
	if (response.ok) {
		const resp = await response.json();
		console.log(resp);
		if (resp.status === 'success') {
            alert('Account Successfully Deleted');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
			window.location.href = './index.html';
		} else {
			alert('error! one');
		}
	} else {
		alert('error! two');
	}
}