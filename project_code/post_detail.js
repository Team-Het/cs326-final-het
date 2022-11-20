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

// Post Detail functions
window.onload = async function () {
    const body = JSON.parse(localStorage.getItem('passBody'));
    // const item_id = localStorage.getItem('item_id');
    // const item_name = localStorage.getItem('item_name');
    // const item_desc = localStorage.getItem('item_desc');
    // const image = localStorage.getItem('image');
    // const address = localStorage.getItem('address');
    // const category = localStorage.getItem('category');
    // const color = localStorage.getItem('color');
    // const brand = localStorage.getItem('brand');
    // const additional = localStorage.getItem('addtional');
    // const lost_date = localStorage.getItem('lost_date');
    // const found_date = localStorage.getItem('found_date');
    // const time_lost = localStorage.getItem('time_lost');
    document.getElementById("title").value = body.title;
    document.getElementById("date_grey").value = body.date_found + body.time_found;
    document.getElementById("add_info").value = body.add_info;
    document.getElementById("category").value = "Category: " + body.category;
    document.getElementById("brand").value = "Brand: " + body.brand;
    document.getElementById("color").value = "Color: " + body.color;
    document.getElementById("date_found").value = body.date_found + body.time_found;
    document.getElementById("where_you_found").value = body.where_you_found;


    if (username && email) {
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;
    }
    window.username = username;
}

async function deletePost() {
    const response = await fetch(localStorage.getItem('host') + '/item/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
            itemId: localStorage.getItem('itemId'),
        })
    });
    if (response.ok) {
        const resp = await response.json();
        console.log(resp);
        if (resp.status === 'success') {
            alert('Post Successfully Deleted');
            localStorage.removeItem('item_id');
            localStorage.removeItem('item_name');
            localStorage.removeItem('item_desc');
            localStorage.removeItem('image');
            localStorage.removeItem('address');
            localStorage.removeItem('is_found');
            localStorage.removeItem('lost_date');
            localStorage.removeItem('time_lost');
            localStorage.removeItem('found_date');
            localStorage.removeItem('category');
            localStorage.removeItem('color');
            localStorage.removeItem('brand');
            localStorage.removeItem('additional');
            window.location.href = './index.html';
        } else {
            alert('error! one');
        }
    } else {
        alert('error! two');
    }
}