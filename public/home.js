
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
import {GetUser, LogOut} from './nav.js';
function ready() {
    const logout = document.getElementById('logout');
    GetUser();
    logout.addEventListener('click', LogOut);
}

const logo = document.getElementById('logo');
logo.addEventListener('click', ()=>{    //onclick refresh the page.
    window.location.href = "/home";
})

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
