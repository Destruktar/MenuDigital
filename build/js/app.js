import { JsonFile } from "./jsonFile.js";

const categorias = [
    new JsonFile('cafeteria', '/build/json/cafeteria.json'),
    new JsonFile('jugos', '/build/json/jugos.json'),
    new JsonFile('combos', '/build/json/combos.json'),
    new JsonFile('tostados-carlitos', '/build/json/tostados-carlitos.json'),
    new JsonFile('aperitivos', '/build/json/aperitivos.json'),
    new JsonFile('menu', '/build/json/menu.json'),
    new JsonFile('sandwichs', '/build/json/sandwichs.json'),
    new JsonFile('tablas', '/build/json/tablas.json'),
    new JsonFile('cazuelas', '/build/json/cazuelas.json'),
    new JsonFile('pizzas', '/build/json/pizzas.json'),
    new JsonFile('infantil', '/build/json/infantil.json'),
    new JsonFile('postres', '/build/json/postres.json'),
    new JsonFile('bebidas', '/build/json/bebidas.json'),
    new JsonFile('cervezas', '/build/json/cervezas.json'),
    new JsonFile('licores-aperitivos', '/build/json/licores-aperitivos.json'),
    new JsonFile('vinos', '/build/json/vinos.json'),
    new JsonFile('cocteles', '/build/json/cocteles.json'),
    new JsonFile('moktails', '/build/json/moktails.json')
]

categorias.forEach(cat => cat.loadData());