//having this to make the code re-usable
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
function GetUser() {
    const name = localStorage.getItem("username");
    document.getElementById("username").innerHTML = name;
}

async function SearchBar(event){
    event.preventDefault();
    const search = document.getElementById('search').value;

    const result = await fetch('/search',{
        method:"POST",
        headers: {
            'Content-Type':"application/json"
        },body:JSON.stringify({
            search
        })
    }).then((res) => res.json())
    if(result.status == "done"){
        window.location.href = "/search";
    }
}

const logo = document.getElementById('logo');
logo.addEventListener('click', ()=>{    //onclick refresh the page.
    window.location.href = "/home";
})

//exporting the two functions so it  can be used from other javascript files
export {LogOut,GetUser,SearchBar, logo};