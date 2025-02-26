export class JsonFile {
    constructor(id, path){
        this.id = id;
        this.path = path;
    }

    async loadData(){
        try{
            const response = await fetch(this.path);
            const data = await response.json();
            this.renderData(data);
        } catch(err){
            console.error(`Error cargando ${this.path}:`, err);
        }
    }

    renderData(platillos){
        let divPlatillos = document.querySelector(`.${this.id} .platillos`);

        if(!divPlatillos) return;

        if(Array.isArray(platillos)){
            platillos.forEach(plato => {
                this.agregarPlato(divPlatillos, plato);
            });
        } else{
            Object.keys(platillos).forEach(cat => {
                let categoriaTitulo = document.createElement('h4');
                categoriaTitulo.textContent = cat.toUpperCase();
                divPlatillos.appendChild(categoriaTitulo);

                platillos[cat].forEach(plato => {
                    this.agregarPlato(divPlatillos, plato);
                });
            });
        }
    }

    agregarPlato(divPlatillos, plato){
        let item = document.createElement('DIV');
            item.classList.add('plato');

            let nombrePrecio = document.createElement('P');
            nombrePrecio.innerHTML = `
                <span class="nombre">${plato.nombre}</span>
                <span class="linea"></span>
                <span class="precio">$${plato.precio}</span>
            `;

            item.appendChild(nombrePrecio);

            if(plato.descripcion){
                let descripcion = document.createElement('P');
                descripcion.classList.add('descripcion');
                descripcion.textContent = plato.descripcion;
                item.appendChild(descripcion);
            }

            divPlatillos.appendChild(item);
    }
}