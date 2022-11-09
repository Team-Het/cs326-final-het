// Navbar functions
function goHome() {
	window.location.href = "./index.html";
}

function profile() {
	// to be done
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

async function submitLostItem() {
	const title = document.getElementById('title').value;
	const category = document.getElementById('category').value;
	const brand = document.getElementById('brand').value;
	const color = document.getElementById('color').value;
	const date_lost = document.getElementById('date_lost').value;
	const time_lost = document.getElementById('time_lost').value;
	const where_you_lost = document.getElementById('where_you_lost').value;
	const add_info = document.getElementById('add_info').value;

	if (!title || !category || !date_lost || !time_lost || !where_you_lost) {
        alert("Please fillout the information with *, then submit your post.");
		return;
    }

	const response = await fetch(localStorage.getItem('host') + '/item/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: title,
			category: category,
			brand: brand,
			color: color,
			date_lost: date_lost,
			time_lost: time_lost,
			where_you_lost: where_you_lost,
			add_info: add_info
		})
	});
	if (response.ok) {
		const resp = await response.json();
		console.log(resp);
		if (resp.status === 'success') {
			window.location.href = './post_detail.html';
		} else {
			alert('error!');
		}
	} else {
		alert('error!');
	}
	localStorage.removeItem('item');
	localStorage.removeItem('location');
}