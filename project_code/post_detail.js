// Navbar functions
function goLogin() {
    window.location.href = "./login.html";
}

function signOut() {
	fetch(window.location.origin + '/logout')
    .then((response)=>response.json())
    .then((data)=>{});
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
    window.location.href = "./profile.html";
}

function refreshSign(){
    const username = localStorage.getItem("username");
    const signIn = document.getElementById("signIn");
    const signOut = document.getElementById("signOut");
    if(username){
        signIn.classList.add('hidden');
        signOut.classList.remove('hidden');
    } else {
        signIn.classList.remove('hidden');
        signOut.classList.add('hidden');
    }
}

// Post Detail functions
window.onload = function () {
    refreshSign();
    const body = JSON.parse(localStorage.getItem('passBody'));
    console.log(body);

    if (body.is_found === 'n') {
        document.getElementById('lostorfound').innerHTML = "Lost An Item!"
    }
    else {
        document.getElementById('lostorfound').innerHTML = "Found An Item!"
    }
    document.getElementById("title").innerHTML = body.item_name;
    //document.getElementById("date_grey").innerHTML = body.date_lost + " " + body.time_lost;
    document.getElementById("additonal").innerHTML = body.additonal;
    document.getElementById("category").innerHTML = "Category: " + body.category;
    document.getElementById("brand").innerHTML = "Brand: " + body.brand;
    document.getElementById("color").innerHTML = "Color: " + body.color;
    document.getElementById("date_lost").innerHTML = "Date & Time: " + body.date_lost + " " + body.time_lost;
    document.getElementById("address").innerHTML = "Location: " + body.address;

	var currentdate = new Date();
    let hours = 0;
    let string = '';
    if(currentdate.getHours() > 12){
        hours = currentdate.getHours() - 12;
        string = "p.m.";
    } 
    else{
        hours = currentdate.getHours();
        string = "a.m.";
    }
    var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " "  
                + hours + ":"  
                + currentdate.getMinutes() + string;
    document.getElementById("currentTime").innerHTML = datetime;
    

    if (username && email) {
        document.getElementById('username').innerHTML = body.username;
        document.getElementById('email').innerHTML = "Please contact me through " + localStorage.getItem("email");
    }
    window.username = username;

    localStorage.removeItem('passBody');
}

async function deletePost() {
    const response = await fetch(window.location.origin + '/item/delete', {
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