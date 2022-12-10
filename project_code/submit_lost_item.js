// Navbar functions
function goLogin() {
	window.location.href = "./login.html";
}

function signOut() {
	fetch(window.location.origin + '/logout')
		.then((response) => response.json())
		.then((data) => { });
	// console.log("in signOut");
	localStorage.removeItem("username");
	localStorage.removeItem("email");
	window.location.href = "./index.html";
	refreshSign();
}

function goHome() {
	window.location.href = "./index.html";
}

function goProfile() {
	const username = localStorage.getItem('username');
	if (username) {
		window.location.href = "./profile.html";
	} else {
		localStorage.setItem('nextPage', 'profile.html');
		window.location.href = "./login.html";
	}
}

function submitItem() {
	localStorage.removeItem('item');
	localStorage.removeItem('location');
}

function refreshSign() {
	const username = localStorage.getItem("username");
	const signIn = document.getElementById("signIn");
	const signOut = document.getElementById("signOut");
	if (username) {
		signIn.classList.add('hidden');
		signOut.classList.remove('hidden');
	} else {
		signIn.classList.remove('hidden');
		signOut.classList.add('hidden');
	}
}

// Submit Lost Item functions
window.onload = async function () {
	refreshSign();
	const update_clicked = localStorage.getItem('update_click');
	if (localStorage.getItem("updateBody") === null || !update_clicked) {	
		const item = localStorage.getItem('item');
		const location = localStorage.getItem('location');
		const fromPage = localStorage.getItem('fromPage');
		localStorage.setItem('nextPage', './submit_lost_item.html');
		if (fromPage && fromPage === 'index') {
			if (item && location) {
				document.getElementById('title').value = item;
				document.getElementById('where_you_lost').value = location;
			}
		}
		console.log(window.location.origin);
		document.getElementById('update').classList.add('hidden');
		document.getElementById('yesupdate').classList.add('hidden');
	}
	else{
		const updateBody = JSON.parse(localStorage.getItem("updateBody"));
		document.getElementById('title').value = updateBody.item_name;
		document.getElementById('where_you_lost').value = updateBody.address;
		document.getElementById('category').value = updateBody.category;
		document.getElementById('date_lost').value = updateBody.date_lost;
		document.getElementById('time_lost').value = updateBody.time_lost;
		document.getElementById('brand').value = updateBody.brand;
		document.getElementById('color').value = updateBody.color;
		document.getElementById('add_info').value = updateBody.additional;	

		document.getElementById('submit_lost').classList.add("hidden");
		document.getElementById('submit_found').classList.add('hidden');
		document.getElementById('update').classList.remove('hidden');
		document.getElementById('notupdate').classList.add('hidden');
		localStorage.removeItem("updateBody");
		document.getElementById('title').setAttribute("readonly","true");
		localStorage.setItem('update_click', false);
	}
}


async function submitItem(submitType) {
	const username = localStorage.getItem('username');
	if (!username) {
		localStorage.setItem('nextPage', './post_detail.html');
		// localStorage.setItem('submitType', submitType);
		window.location.href = './login.html';
	}
	let tmp = "";
	const user = await fetch(window.location.origin + '/user/view/' + username, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	});
	if (user.ok) {
		tmp = await user.json();
		localStorage.setItem("email", tmp.email);
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
			additional: add_info,
			is_found: submitType === 'lost' ? 'n' : 'y',
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
		additional: add_info,
		is_found: submitType === 'lost' ? 'n' : 'y',
	};

	console.log(response);
	if (response.ok) {
		localStorage.setItem('item_detail', JSON.stringify(passBody));
		console.log(localStorage.getItem('item_detail'));

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

async function updatePost() {
	const title = document.getElementById('title').value;
	const category = document.getElementById('category').value;
	const brand = document.getElementById('brand').value;
	const color = document.getElementById('color').value;
	const date_lost = document.getElementById('date_lost').value;
	const time_lost = document.getElementById('time_lost').value;
	const where_you_lost = document.getElementById('where_you_lost').value;
	const add_info = document.getElementById('add_info').value;
	const is_found = JSON.parse(localStorage.getItem("item_detail")).is_found;

	const username = localStorage.getItem('username');
	if (!username) {
		localStorage.setItem('nextPage', './submit_lost_item.html');
		window.location.href = './login.html';
	}

	const response = await fetch(window.location.origin + '/item/update', {
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
			additional: add_info,
			is_found: is_found,
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
		additional: add_info,
		is_found: is_found,
	};

	console.log(response);
	if (response.ok) {
		// 
		// 
		localStorage.setItem('item_detail', JSON.stringify(passBody));
		console.log(localStorage.getItem('item_detail'));
		// If it's passbody then the post detail won't upload so I changed.
		// 
		// localStorage.setItem('passBody', JSON.stringify(passBody));
		// console.log(localStorage.getItem('passBody'));

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

function uploadFile() {
	let formData = new FormData();
	const fileUpload = document.getElementById("fileUpload");
	formData.append("metadata", JSON.stringify({ username: 'testuser', item_name: 'Laptop' }));
	formData.append("filename", fileUpload.files[0]);
	console.log(formData);
	fetch('/item/upload/', {
		method: "POST",
		body: formData
	})
		.then((response) => {
			if (response.redirected) {
				window.location.href = response.url;
			}
			return response.json();
		})
		.then((resp) => {
			console.log(resp);
			if (resp.status === 'success') {
				const img = document.getElementById('itemImage');
				img.src = resp.image;
			} else {
				alert('Error uploading file');
			}
		})
}