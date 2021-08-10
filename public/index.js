const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('s-form');
signupForm.addEventListener('submit',SignUp);
loginForm.addEventListener('submit', CheckDetails);

async function SignUp(event){
    const signupName = document.getElementById('s-name').value;
    const signupPassword = document.getElementById('s-password').value;
    const signupEmail = document.getElementById('s-email').value;
    const reqtype = "signup";
    event.preventDefault();
    const result = await fetch('./',{
        method: "POST",
        headers : {
            'Content-Type' : 'application/json'
        },body:JSON.stringify({
            signupName, 
            signupPassword,
            signupEmail,
            reqtype
        })
    }).then((res) => res.json())
    if (result.status === 'ok') {
        window.location.href = "/";
        alert('Your account has been created')
    } else {
        alert(result.error)
    }
}
        //saving username to local storage, so that I can access username and display it on another html file since im not using the GET method.
function saveData(){
    const username = document.getElementById('username').value;
    localStorage.setItem("username", username);
}
async function CheckDetails(event){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const reqtype = "login"
    event.preventDefault();

    const result = await fetch('./', {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            reqtype
        })
    }).then((res) => res.json())

    if(result.status === 'matched'){
        window.location.href = "/home"
    }else{
        alert(result.error);
    }
}



