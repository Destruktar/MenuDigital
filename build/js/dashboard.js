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

//Editar Plato

//TODO: Agregar funcion para editar platos añadidos

//Eliminar Plato

//TODO: Agregar funcion para elminiar los platos por ID


//Boton Agregar Plato

document.querySelector('#addProduct').addEventListener("click", (event) => {
    
    event.preventDefault();

    const name = document.querySelector('#nombrePlatillo').value.trim();
    const price = document.querySelector('#precioPlatillo').value.trim();
    const category = document.querySelector('#categoriaPlatillo').value;

    const description = document.querySelector('#descripcionPlatillo').value.trim();
    const subcat = document.querySelector('#subcatPlatillo').value.trim();

    if(!name || !price || !category){
        alert("El plato debe tener Nombre, Precio y Categoria");
        return;
    }

    if(isNaN(price) || Number(price) <= 0){
        alert("El precio debe ser un número válido mayor que 0");
        return;
    }


    const newProduct = {
        name: name,
        price: Number(price),
        category: category
    }


    if(description){
        newProduct.description = description;
    }

    if(subcat){
        newProduct.subcat = subcat;
    }

    addProduct(newProduct);

    //Limpiar el formulario
    document.querySelector('#platilloForm').reset();
});

function renderTable(products){
    currentProducts = products;

    const tbody = document.querySelector('#tableBody');
    tbody.innerHTML = "";

    products.forEach(p => {
        const tr = document.createElement("TR");

        tr.innerHTML = `
            <td>${p.name}</td>
            <td>${p.description || ""}</td>
            <td>${p.category}</td>
            <td>${p.subcat || ""}</td>
            <td>${p.price}</td>
            <td>
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-regular fa-trash-can"></i>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function sortTable(field){
    const sorted = [...currentProducts].sort((a,b) =>{
        if(field == "price"){
            return a.price - b.price
        }

        return a[field].localeCompare(b[field]);
    });

    renderTable(sorted);
}

document.querySelector('#sortName').addEventListener('click', () => {
    sortTable('name');
});

document.querySelector('#sortPrice').addEventListener('click', () => {
    sortTable('price');
});

document.querySelector('#sortCategory').addEventListener('click', () => {
    sortTable('category');
});

loadMenuList();