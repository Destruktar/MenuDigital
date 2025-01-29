document.querySelectorAll("li").forEach(li=> {
    //Crea un nuevo div para los span
    let div = document.createElement("DIV");
    div.classList.add("lista__info"); //Agrega la clase lista__info

    //Selecciona los span dentro de li
    let spans = li.querySelectorAll("span");

    //Mover los span dentro del div
    spans.forEach(span => div.appendChild(span));

    //Inserta el div al principio del li
    li.insertBefore(div, li.firstChild);
});