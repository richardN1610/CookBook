if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

const express = require('express');
const UserPost = require('../userpost');
const router = express.Router();

function ready(){
    const postFeed = document.getElementById('post-btn');
    postFeed.addEventListener('click',PostFeed);
    GetUser();
}

//needs to add this to the database then pull it frm the database to the feed page. (Will do more reading on this)
// router.post('/home', async(req,res) =>{
//     const name = localStorage.getItem("username");
//     document.getElementById("username").innerHTML = name;
//     const userIput = document.getElementById('input-msg').value;
//     const post = UserPost.create({
//         username: name,
//         post: userIput
//     })
//     try{
//         post = await post.save()
//     }catch(e){
//         res.render('home.ejs');
//     }
// })

async function GetUser(){
    const name = localStorage.getItem("username");
    document.getElementById("username").innerHTML = name;
}

function PostFeed(event){
    event.preventDefault();
    const userIput = document.getElementById('input-msg').value;
    var feedPage = document.getElementsByClassName('middle-contents')[0];
    //creating div element
    const feedDiv = document.createElement('div');
    feedDiv.classList.add('post-box');  //adding class to the div
    const userFeed = `  
            <div class="msg-box">
            ${userIput}
            </div>
            <div class="like">
                <i class="fab fa-gratipay"> Love</i>
                <i class="far fa-thumbs-down"> Dislike</i>
            </div>
         </div>`;
    
    //changing to innerhtml
    feedDiv.innerHTML = userFeed
    //adding feed to page

    if(userIput.trim() === "" || userIput === null){
        alert("Your post cannot be empty.")
    }else{
        feedPage.append(feedDiv);
    }
}