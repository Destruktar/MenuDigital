import {setPersistence, browserSessionPersistence, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {auth} from "./firebase.js";

document.querySelector('#loginBtn').addEventListener("click" , async (event) =>{

    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {

        await setPersistence(auth, browserSessionPersistence);

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = './dashboard.html';

    } catch (error){

        alert("Login Incorrecto");

    }
});