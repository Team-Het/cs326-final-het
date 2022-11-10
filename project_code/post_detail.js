// Navbar functions
function goHome() {
    window.location.href = "./index.html";
}

function profile() {
    // to be done
}

// Post Detail functions
async function postDetail() {

}
// window.onload = async function () {
//     const fromPage = localStorage.getItem('fromPage');
//     const title = localStorage.getItem('title');
//     const category = localStorage.getItem('category');
//     const brand = localStorage.getItem('brand');
//     const color = localStorage.getItem('color');
//     const add_info = localStorage.getItem('add_info');

//     if (fromPage && fromPage === 'submit_found_item') {
//         const date_found = localStorage.getItem('date_found');
//         const time_found = localStorage.getItem('time_found');
//         const where_you_found = localStorage.getItem('where_you_found');
//     }
//     else if (fromPage && fromPage === 'submit_lost_item') {
//         const date_lost = localStorage.getItem('date_lost');
//         const time_lost = localStorage.getItem('time_lost');
//         const where_you_lost = localStorage.getItem('where_you_lost');
//     }

//     console.log(window.location.origin);
// }

// async function postDetail() {

//     localStorage.removeItem('title');
//     localStorage.removeItem('category');
//     localStorage.removeItem('brand');
//     localStorage.removeItem('color');
//     localStorage.removeItem('add_info');
//     if (fromPage && fromPage === 'submit_lost_item') {
//         localStorage.removeItem('date_lost');
//         localStorage.removeItem('time_lost');
//         localStorage.removeItem('where_you_lost');
//     }
//     else if (fromPage && fromPage === 'submit_found_item') {
//         localStorage.removeItem('date_found');
//         localStorage.removeItem('time_found');
//         localStorage.removeItem('where_you_found');
//     }



//     document.getElementById('title').value = '';
//     document.getElementById('category').value = '';
//     document.getElementById('brand').value = '';
//     document.getElementById('color').value = '';
//     document.getElementById('add_info').value = '';
//     if (fromPage && fromPage === 'submit_lost_item') {
//         document.getElementById('date_lost').value = '';
//         document.getElementById('time_lost').value = '';
//         document.getElementById('where_you_lost').value = '';
//     }
//     else if (fromPage && fromPage === 'submit_found_item') {
//         document.getElementById('date_found').value = '';
//         document.getElementById('time_found').value = '';
//         document.getElementById('where_you_found').value = '';
//     }

//     const title = document.getElementById('title').value;
//     const category = document.getElementById('category').value;
//     const brand = document.getElementById('brand').value;
//     const color = document.getElementById('color').value;
//     const add_info = document.getElementById('add_info').value;
//     if (fromPage && fromPage === 'submit_found_item') {
//         const date_found = document.getElementById('date_found').value;
//         const time_found = document.getElementById('time_found').value;
//         const where_you_found = document.getElementById('where_you_found').value;
//     }
//     else if (fromPage && fromPage === 'submit_lost_item') {
//         const date_found = document.getElementById('date_lost').value;
//         const time_found = document.getElementById('time_lost').value;
//         const where_you_found = document.getElementById('where_you_lost').value;
//     }

//     const response = await fetch('/item/view/:id', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json;charset=utf-8' },
//         body: JSON.stringify({
//             title: title,
//             category: category,
//             brand: brand,
//             color: color,
//             date_found: date_found,
//             time_found: time_found,
//             where_you_found: where_you_found,
//             add_info: add_info
//         })
//     });
//     if (response.ok) {
//         const resp = await response.json();
//         console.log(resp);
//         if (resp.status === 'success') {

//         } else {
//             alert('error!');
//         }
//     } else {
//         alert('error!');
//     }
//     localStorage.removeItem('item');
//     localStorage.removeItem('location');
