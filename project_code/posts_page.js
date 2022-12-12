// Navbar functions
function goLogin(){
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

function goHome(){
    window.location.href = "./index.html";
}

function goProfile(){
    const username = localStorage.getItem('username');
    if(username){
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

// Posts Page functions
window.onload = async function () {
    refreshSign();
    this.getItems();
    localStorage.setItem('nextPage', './posts_page.html');
    console.log("post detail next");
};

function readDetail(e) {
    localStorage.setItem("item_detail", JSON.stringify(e));
    window.location.href = './post_detail.html';
}

function getItems() {
	fetch(window.location.origin + '/item/view/getall')
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);

        const lostItems = data.results.filter(v=>v.is_found==='n');
        const foundItems = data.results.filter(v=>v.is_found==='y');

        const lostDiv = document.getElementById("lost");
        lostItems.forEach( e => {
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
            strong.classList.add("text-primary");
            strong.innerHTML = 'Lost!';
            const h3 = document.createElement("h3");
            h3.classList.add("mb-2");
            h3.innerHTML = e.item_name;
            const div3 = document.createElement("div");
            div3.classList.add("mb-1");
            div3.classList.add("text-muted");
            const date = new Date(e.date_lost);
            const newdate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            div3.innerHTML = newdate;
            const p = document.createElement("p");
            p.classList.add("card-text");
            p.classList.add("mb-2");
            p.innerHTML = e.additional;
            const a = document.createElement("a");
            a.classList.add("alert-primary");
            a.classList.add("cursor");
            a.innerHTML = 'Read more details';
            a.addEventListener('click', () => {readDetail(e)});
            const div4 = document.createElement("div");
            div4.classList.add("col-auto");
            div4.classList.add("d-none");
            div4.classList.add("d-lg-block");
            const svg = document.createElement("svg");
            svg.classList.add("bd-placeholder-img");
            
            div2.appendChild(strong);
            div2.appendChild(h3);
            div2.appendChild(div3);
            div2.appendChild(p);
            div2.appendChild(a);
            div1.appendChild(div2);
            div4.appendChild(svg);
            div1.appendChild(div4);
            lostDiv.appendChild(div1);
        });
        const foundDiv = document.getElementById("found");
        foundItems.forEach( e => {
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
            strong.classList.add("text-primary");
            strong.innerHTML = 'Found!';
            const h3 = document.createElement("h3");
            h3.classList.add("mb-2");
            h3.innerHTML = e.item_name;
            const div3 = document.createElement("div");
            div3.classList.add("mb-1");
            div3.classList.add("text-muted");
            const date = new Date(e.date_lost);
            const newdate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            div3.innerHTML = newdate;
            const p = document.createElement("p");
            p.classList.add("card-text");
            p.classList.add("mb-2");
            p.innerHTML = e.additional;
            const a = document.createElement("a");
            a.classList.add("alert-primary");
            a.classList.add("cursor");
            a.innerHTML = 'Read more details';
            a.addEventListener('click', ()=>{readDetail(e)});
            const div4 = document.createElement("div");
            div4.classList.add("col-auto");
            div4.classList.add("d-none");
            div4.classList.add("d-lg-block");
            const svg = document.createElement("svg");
            svg.classList.add("bd-placeholder-img");
            
            div2.appendChild(strong);
            div2.appendChild(h3);
            div2.appendChild(div3);
            div2.appendChild(p);
            div2.appendChild(a);
            div1.appendChild(div2);
            div4.appendChild(svg);
            div1.appendChild(div4);
            foundDiv.appendChild(div1);
       });
    });
}