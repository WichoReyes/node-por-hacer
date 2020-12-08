const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    //convierte un objeto en un formato JSON valido 
    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile('DB/data.json', data, (err) => {
        if (err) {
            throw new Error('No de pudo grabar', err);
        }
    })
}


const cargarDB = () => {
    try {
        listadoPorHacer = require('../DB/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const getListado = (completado) => {
    cargarDB();
    if (completado === true) {
        //filter hace que nos devuelva elementos de un arreglo con cierta condicion que se debe de cumplir 
        let listaAux = listadoPorHacer.filter(tarea => tarea.completado === completado);
        return listaAux;
    } else if (completado === false) {
        let listaAux = listadoPorHacer.filter(tarea => tarea.completado === completado);
        return listaAux;
    }
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    //encuentra el indice de un elemento dentro de un arreglo por medio de una condicion que debe de ser cumplida
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
            descripcion,
            completado: false
        }
        //Añade uno o mas elementos al final de un array 
        //y devuelve la nueva longitud del array
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

module.exports = {
    crear,
    getListado,
    borrar,
    actualizar
}