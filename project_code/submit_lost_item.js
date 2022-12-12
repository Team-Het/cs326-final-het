// Navbar functions
function goLogin() {
	window.location.href = "./login.html";
}

function signOut() {
	fetch(window.location.origin + '/logout')
		.then((response) => response.json())
		.then((data) => { });
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

function submitPost() {
	localStorage.removeItem('item');
	localStorage.removeItem('location');
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
        loginName.innerHTML = '';
    }
}

// Submit Lost Item functions
window.onload = async function () {
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

	const update_clicked = localStorage.getItem('update_click');
	if (localStorage.getItem("updateBody") === null || (update_clicked === null || !update_clicked)) {	
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
	} else {
		const updateBody = JSON.parse(localStorage.getItem("updateBody"));
		document.getElementById('title').value = updateBody.item_name;
		document.getElementById('where_you_lost').value = updateBody.address;
		document.getElementById('category').value = updateBody.category;
		document.getElementById('date_lost').value = updateBody.date_lost;
		document.getElementById('time_lost').value = updateBody.time_lost;
		document.getElementById('brand').value = updateBody.brand;
		document.getElementById('color').value = updateBody.color;
		document.getElementById('add_info').value = updateBody.additional;	
		document.getElementById('itemImage').src = updateBody.image;

		document.getElementById('submit_lost').classList.add("hidden");
		document.getElementById('submit_found').classList.add('hidden');
		document.getElementById('update').classList.remove('hidden');
		document.getElementById('notupdate').classList.add('hidden');
		localStorage.removeItem("updateBody");
		document.getElementById('title').setAttribute("readonly","true");
		localStorage.removeItem('update_click');
		if (updateBody.image && updateBody.image.includes("download")) {
			const deleteButton = document.getElementById("deleteButton");
			deleteButton.classList.remove('hidden');
		} else {
			document.getElementById('itemImage').src = '';
		}
	}
};


async function submitItem(submitType) {
	const username = localStorage.getItem('username');
	if (!username) {
		localStorage.setItem('nextPage', './post_detail.html');
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
			is_found: submitType === 'lost' ? 'n' : 'y',
		})
	});

	let src = document.getElementById("itemImage").src;
	if (src.includes("html")){
		src = "";
	}

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
		image: src
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

	let src = document.getElementById("itemImage").src;
	if (src.includes("html")){
		src = "";
	}

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
		image: src
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
		} else {
			alert('Error Processing Data');
		}
	} else {
		alert('Server Error');
	}
}

function uploadFile() {
	const formData = new FormData();
	const fileUpload = document.getElementById("fileUpload");

	formData.append("metadata", JSON.stringify({ username: localStorage.getItem('username'), item_name: document.getElementById('title').value}));
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
				const deleteButton = document.getElementById("deleteButton");
				deleteButton.classList.remove('hidden');
			} else {
				alert('Error uploading file');
			}
		});
}

function deleteImage() {
	const body = {
		delete_image: "y",
		item_name: document.getElementById('title').value,
		username: localStorage.getItem('username'),
	};
	fetch('/item/update/', {
		method: "POST",
		body: body
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
				img.src = "";
				localStorage.removeItems("item_detail");
				const deleteButton = document.getElementById("deleteButton");
				deleteButton.classList.add('hidden');
				const fileUpload = document.getElementById("fileUpload");
				fileUpload.value = "";	
			} else {
				alert('Error deleting file');
			}
		});
}