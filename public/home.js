
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    const logout = document.getElementById('logout');
    GetUser();
    logout.addEventListener('click', LogOut);
}
//sending logout req to server
async function LogOut(){
    const logout = "logout"
    const result = await fetch('./home',{
        method: "POST",
        headers : {
            'Content-Type' : 'application/json'
        },body:JSON.stringify({
            logout
        })
    }).then((res) => res.json())
    if (result.status === 'logged-out') {
        alert('You have logged out')
        window.location.href = "/";
    }
}

const logo = document.getElementById('logo');
logo.addEventListener('click', ()=>{    //onclick refresh the page.
    window.location.href = "/home";
})

async function GetUser() {
    const name = localStorage.getItem("username");
    document.getElementById("username").innerHTML = name;
}

var socket = io('http://localhost:3000');
socket.on("message", data => {
    addPost(data);
})

const postForm = document.getElementById('post-status');
postForm.addEventListener('submit', event => {
    event.preventDefault(); //prevent the page from refreshing
    var userInput = document.getElementById('input-msg').value; //getting value of user input
    socket.emit('message', userInput);  //sending messages
    document.getElementById('input-msg').value = "";    //clearing textbox field.
});


function addPost(data) {
    var feedPage = document.getElementsByClassName('feed-div')[0];
    //creating div element
    const feedDiv = document.createElement('div');
    feedDiv.classList.add('post-box');  //adding class to the div
    const userFeed = `  
            <div class="msg-box">
            ${data}
            </div>
            <div class="like">
                <i class="fab fa-gratipay"> Love</i>
                <i class="far fa-thumbs-down"> Dislike</i>
            </div>
         </div>`;

    //changing to innerhtml
    feedDiv.innerHTML = userFeed
    if (data.trim() === "" || data === null) {
        alert("Your post cannot be empty.");
    } else {
        //adding div to page in descending order with prepend instead of append.
        feedPage.prepend(feedDiv);
    }
}