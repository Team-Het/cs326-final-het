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

function goUpdate() {
    window.location.href = "./submit_lost_item.html";
    localStorage.setItem('update_click', true);
}

// Post Detail functions
window.onload = function () {
    const body = JSON.parse(localStorage.getItem('item_detail'));
    const username = localStorage.getItem("username");
    let itemEmail = '';
    const itemUsername = body.username;
    document.getElementById('username').innerHTML = body.username;

    fetch(window.location.origin + '/user/view/' + itemUsername)
        .then((response) => response.json())
        .then((data) => {
            itemEmail = data.email;
            document.getElementById('email').innerHTML = "Please contact me through " + itemEmail;
            console.log(data);
        });

    refreshSign();

    console.log(body);

    if (body.is_found === 'n') {
        document.getElementById('lostorfound').innerHTML = "Lost An Item!"
    }
    else {
        document.getElementById('lostorfound').innerHTML = "Found An Item!"
    }
    document.getElementById("title").innerHTML = body.item_name;
    document.getElementById("additional").innerHTML = body.additional;
    document.getElementById("category").innerHTML = "Category: " + body.category;
    document.getElementById("brand").innerHTML = "Brand: " + body.brand;
    document.getElementById("color").innerHTML = "Color: " + body.color;
    document.getElementById("date_lost").innerHTML = "Date & Time: " + body.date_lost + " " + body.time_lost;
    document.getElementById("address").innerHTML = "Location: " + body.address;

    var currentdate = new Date();
    let hours = 0;
    let string = '';
    if (currentdate.getHours() > 12) {
        hours = currentdate.getHours() - 12;
        string = "p.m.";
    }
    else {
        hours = currentdate.getHours();
        string = "a.m.";
    }
    var datetime = "Most recent visit: " + (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " "
        + hours + ":"
        + currentdate.getMinutes() + string;
    localStorage.setItem("currentTime", datetime);
    document.getElementById("currentTime").innerHTML = localStorage.getItem("currentTime");

    window.username = username;
    localStorage.setItem("updateBody", JSON.stringify(body));

    const update = document.getElementById('update_post');
    const deleteP = document.getElementById('delete_post');
    if (username && username === body.username) {
        update.classList.remove('hidden');
        deleteP.classList.remove('hidden');
    } else {
        update.classList.add('hidden');
        deleteP.classList.add('hidden');
    }

    if (!body.additional) {
        document.getElementById('additional').classList.add("mb-auto");
        document.getElementById('additional').classList.remove("mb-2");
    }

    document.getElementById('itemImage').src = body.image;
    if (body.image && body.image.includes("download")) {
        document.getElementById('itemImage').classList.add("mt-3");
    }
}

async function deletePost() {
    const body = JSON.parse(localStorage.getItem('item_detail'));
    const response = await fetch(window.location.origin + '/item/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
            item_name: body.item_name,
            username: body.username
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
            localStorage.removeItem('date_lost');
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

async function createComment() {
    const body = JSON.parse(localStorage.getItem('item_detail'));
    const comment = document.getElementById("userComment");
    body.newComment = comment;
    const response = await fetch(window.location.origin + '/item/comment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
    });
}