// Navbar functions
function goLogin(){
    window.location.href = "./login.html";
}

function goHome() {
	window.location.href = "./index.html";
}

function goProfile(){
    window.location.href = "./profile.html";
}

function submitLost() {
	localStorage.removeItem('item');
	localStorage.removeItem('location');
}

// Submit Lost Item functions
window.onload = async function () {
	const item = localStorage.getItem('item');
	const location = localStorage.getItem('location');
	const fromPage = localStorage.getItem('fromPage');
	if(fromPage && fromPage === 'index') {
		if (item && location) {
			document.getElementById('title').value = item;
			document.getElementById('where_you_lost').value = location;
		}
	}
	console.log(window.location.origin);
}

async function submitLostItem(submitType) {
	const username = localStorage.getItem('username');
	if (!username) {
		localStorage.setItem('nextPage', './submit_lost_item.html');
		window.location.href = './login.html';
	}
	let tmp = "";
	const user = await fetch(window.location.origin + '/user/view/' + username, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	});
	if (user.ok) {
		tmp = user.email;
		console.log(tmp);
		localStorage.setItem("email", tmp);
	}
	else {
		alert('Server Error');
	}
	const title = document.getElementById('title').value;
	const category = document.getElementById('category').value;
	const brand = document.getElementById('brand').value;
	const color = document.getElementById('color').value;
	const date_lost = document.getElementById('date_lost').value;
	const time_lost = document.getElementById('time_lost').value;
	const where_you_lost = document.getElementById('where_you_lost').value;
	const add_info = document.getElementById('add_info').value;


	localStorage.removeItem('item');
	localStorage.removeItem('location');

	if (!title || !category || !date_lost || !time_lost || !where_you_lost) {
        alert("Please fillout the information with *, then submit your post.");
		return;
    }

	const response = await fetch(window.location.origin + '/item/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			username: username,
			item_name: title,
			category: category,
			brand: brand,
			color: color,
			date_lost: date_lost,
			time_lost: time_lost,
			address: where_you_lost,
			additonal: add_info,
			is_found: submitType==='lost'?'n':'y',
		})
	});

	const passBody = {
		username: username,
		item_name: title,
		category: category,
		brand: brand,
		color: color,
		date_lost: date_lost,
		time_lost: time_lost,
		address: where_you_lost,
		additonal: add_info,
		is_found: submitType==='lost'?'n':'y',
	};
	
	console.log(response);
	if (response.ok) {
		localStorage.setItem('passBody', JSON.stringify(passBody));
		console.log(localStorage.getItem('passBody'));

		localStorage.removeItem('item');
		localStorage.removeItem('location');
		document.getElementById('title').value = '';
		document.getElementById('where_you_lost').value = '';
		if (response.redirected) {
			localStorage.setItem('nextPage', './post_detail.html');
			window.location.href = response.url;
		}
		const resp = await response.json();
		console.log(resp);
		if (resp.status === 'success') {
			window.location.href = './post_detail.html';
			// localStorage.setItem('nextPage', './post_detail.html');
		} else {
			alert('Error Processing Data');
		}
	} else {
		alert('Server Error');
	}
}