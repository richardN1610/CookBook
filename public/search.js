import { GetUser,LogOut } from "./nav.js";  //importing functions from nav.js

GetUser();

const logout = document.getElementById('logout')
logout.addEventListener('click', LogOut);