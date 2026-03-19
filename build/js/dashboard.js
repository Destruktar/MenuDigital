import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {collection, addDoc, getDocs, deleteDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
import {auth, db} from "./firebase.js";

let timeLapse;
let currentProducts = [];

onAuthStateChanged(auth, (user) =>{
    if(!user){
        window.location.href = "./login.html";
    }
});

document.querySelector('#logOut').addEventListener("click", async (event) =>{
    event.preventDefault();

    await signOut(auth);

    window.location.href = './login.html';
});

function resetTimer(){

    clearTimeout(timeLapse);

    timeLapse = setTimeout(() =>{

        signOut(auth);
        window.location.href = "./login.html";
    }, 10 * 60 * 1000);
}

document.addEventListener("mousemove", resetTimer);
document.addEventListener("keydown", resetTimer);

resetTimer();

// CRUD

//Agregar Producto

async function addProduct(menuProduct) {

    await addDoc(collection(db, "menu"), menuProduct);

    loadMenuList();
    
}

//Leer Productos

async function loadMenuList() {
    
    const querySnapshot = await getDocs(collection(db, "menu"));

    const products = [];


    querySnapshot.forEach((docu) => {
        const data = docu.data();

        products.push({
            id: docu.id, //Importante para poder editar o eliminar despues
            ...data
        })
    });

    renderTable(products);
}


//Boton Agregar Plato

document.querySelector('#addProduct').addEventListener("click", (event) => {
    
    event.preventDefault();

    const newProduct = {
        name: document.querySelector('#nombrePlatillo').value,
        price: document.querySelector('#precioPlatillo').value,
        category: document.querySelector('#categoriaPlatillo').value
    }

    const description = document.querySelector('#descripcionPlatillo').value;

    if(description){
        newProduct.description = description;
    }

    addProduct(newProduct);
});

function renderTable(products){
    currentProducts = products;

    const tbody = document.querySelector('#tableBody');
    tbody.innerHTML = "";

    products.forEach(p => {
        const tr = document.createElement("TR");

        tr.innerHTML = `
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.category}</td>
            <td>${p.description || ""}</td>

        `;

        tbody.appendChild(tr);
    });
}

loadMenuList();