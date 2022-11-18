// Navbar functions
function goHome() {
    window.location.href = "./index.html";
}

function profile() {
    // to be done
}

// Post Detail functions
async function postDetail() {

    fetch(localStorage.getItem('host') + '/item/view/item_id')
        .then((response) => response.json())
        .then((data) => {
            const itemDiv = document.getElementById("detail");
            if (data.is_found === 'y') {

                const div1 = document.createElement("div");
                div1.classList.add("row");
                div1.classList.add("g-0");
                div1.classList.add("border");
                div1.classList.add("rounded");
                div1.classList.add("overflow-hidden");
                div1.classList.add("flex-md-row");
                div1.classList.add("my-4");
                div1.classList.add("shadow-sm");
                div1.classList.add("h-md-250");
                div1.classList.add("position-relative");

                const div2 = document.createElement("div");
                div2.classList.add("col");
                div2.classList.add("p-4");
                div2.classList.add("d-flex");
                div2.classList.add("flex-column");
                div2.classList.add("position-static");

                const strong = document.createElement("strong");
                strong.classList.add("d-inline-block");
                strong.classList.add("mb-2");
                strong.classList.add("text-success");
                strong.innerHTML = 'Found an Item!';

                const h3 = document.createElement("h3");
                h3.classList.add("mb-0");
                h3.innerHTML = data.item_name;

                const div3 = document.createElement("div");
                div3.classList.add("mb-auto");
                div3.classList.add("text-muted");
                const date = new Date(data.found_date);
                const newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                div3.innerHTML = newdate;

                const p = document.createElement("p");
                p.classList.add("mb-auto");
                p.innerHTML = data.item_desc;

                const a = document.createElement("a");
                a.classList.add("mb-auto");
                a.innerHTML = data.address;

                const b = document.createElement("b");
                b.classList.add("mb-auto");
                b.innerHTML = data.category;

                const c = document.createElement("c");
                c.classList.add("mb-auto");
                c.innerHTML = data.color;

                const d = document.createElement("c");
                d.classList.add("mb-auto");
                d.innerHTML = data.brand;

                const e = document.createElement("c");
                e.classList.add("mb-auto");
                e.innerHTML = data.additional;

                // a.addEventListener('click', () => { readDetail(e) });
                // const div4 = document.createElement("div");
                // div4.classList.add("col-auto");
                // div4.classList.add("d-none");
                // div4.classList.add("d-lg-block");
                // const svg = document.createElement("svg");
                // svg.classList.add("bd-placeholder-img");

                div2.appendChild(strong);
                div2.appendChild(h3);
                div2.appendChild(div3);
                div2.appendChild(p);
                div2.appendChild(a);
                div2.appendChild(b);
                div2.appendChild(c);
                div2.appendChild(d);
                div2.appendChild(e);
                div1.appendChild(div2);
                itemDiv.appendChild(div1);
            }
            else {

                const div1 = document.createElement("div");
                div1.classList.add("row");
                div1.classList.add("g-0");
                div1.classList.add("border");
                div1.classList.add("rounded");
                div1.classList.add("overflow-hidden");
                div1.classList.add("flex-md-row");
                div1.classList.add("my-4");
                div1.classList.add("shadow-sm");
                div1.classList.add("h-md-250");
                div1.classList.add("position-relative");

                const div2 = document.createElement("div");
                div2.classList.add("col");
                div2.classList.add("p-4");
                div2.classList.add("d-flex");
                div2.classList.add("flex-column");
                div2.classList.add("position-static");

                const strong = document.createElement("strong");
                strong.classList.add("d-inline-block");
                strong.classList.add("mb-2");
                strong.classList.add("text-success");
                strong.innerHTML = 'Lost an Item!';

                const h3 = document.createElement("h3");
                h3.classList.add("mb-0");
                h3.innerHTML = data.item_name;

                const div3 = document.createElement("div");
                div3.classList.add("mb-auto");
                div3.classList.add("text-muted");
                const date = new Date(data.lost_date);
                const newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                div3.innerHTML = newdate;

                const p = document.createElement("p");
                p.classList.add("mb-auto");
                p.innerHTML = data.item_desc;

                const a = document.createElement("a");
                a.classList.add("mb-auto");
                a.innerHTML = data.address;

                const b = document.createElement("b");
                b.classList.add("mb-auto");
                b.innerHTML = data.category;

                const c = document.createElement("c");
                c.classList.add("mb-auto");
                c.innerHTML = data.color;

                const d = document.createElement("c");
                d.classList.add("mb-auto");
                d.innerHTML = data.brand;

                const e = document.createElement("c");
                e.classList.add("mb-auto");
                e.innerHTML = data.additional;

                // a.addEventListener('click', () => { readDetail(e) });
                // const div4 = document.createElement("div");
                // div4.classList.add("col-auto");
                // div4.classList.add("d-none");
                // div4.classList.add("d-lg-block");
                // const svg = document.createElement("svg");
                // svg.classList.add("bd-placeholder-img");

                div2.appendChild(strong);
                div2.appendChild(h3);
                div2.appendChild(div3);
                div2.appendChild(p);
                div2.appendChild(a);
                div2.appendChild(b);
                div2.appendChild(c);
                div2.appendChild(d);
                div2.appendChild(e);
                div1.appendChild(div2);
                itemDiv.appendChild(div1);
            }
        });
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
