if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    const postFeed = document.getElementById('post-btn');
    postFeed.addEventListener('click',PostFeed);
    GetUser();
}

async function GetUser(){
    const name = localStorage.getItem("username");
    document.getElementById("username").innerHTML = name;
}

async function PostFeed(event){
    event.preventDefault();
    const userInput = document.getElementById('input-msg').value;
    const result = await fetch('/home', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },body: JSON.stringify({
            userInput
        })
    }).then((res) => res.json())

    if(result.status === 'posted'){
        // window.location.href ="/home"
    }

    
    // var feedPage = document.getElementsByClassName('middle-contents')[0];
    // //creating div element
    // const feedDiv = document.createElement('div');
    // feedDiv.classList.add('post-box');  //adding class to the div
    // const userFeed = `  
    //         <div class="msg-box">
    //         ${userIput}
    //         </div>
    //         <div class="like">
    //             <i class="fab fa-gratipay"> Love</i>
    //             <i class="far fa-thumbs-down"> Dislike</i>
    //         </div>
    //      </div>`;
    
    // //changing to innerhtml
    // feedDiv.innerHTML = userFeed
    // //adding feed to page

    // if(userIput.trim() === "" || userIput === null){
    //     alert("Your post cannot be empty.")
    // }else{
    //     feedPage.append(feedDiv);
    // }
}