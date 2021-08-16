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
async function GetUser() {
    const name = localStorage.getItem("username");
    document.getElementById("username").innerHTML = name;
}

export {LogOut,GetUser};