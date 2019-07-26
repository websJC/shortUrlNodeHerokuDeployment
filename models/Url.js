//Como es un model la primera letra va en mayúscula
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const urlSchema = new Schema({
    //Necesitamos almacenar la url del user y la corta
    urlOriginal: {
        //lo almacenamos como string
        type: String,
        //lo convertimos a minusculas
        lowercase: true,
        //quitamos los espacios en blanco
        trim: true
    },
    urlCorta: {
        type: String
    }

});

//Métodos de mongoose
//Antes de guardar, ejecuta una funcion asincrona, donde haremos
//la url corta con la dependencia shortID
urlSchema.pre('save', async function(next){
    //generamos la url corta
    //this aquí es el objeto vacio que se va a insertar en la base de datos. Se le pasa la urlOriginal que es lo que 
    //el usuario escribe, y urlCorta, lo interceptamos antes de que se guarde
    // va a tener el siguiente code generar.shortId. Y next, es como
    //un middelware que le dice que cuando lo haya ejecutado, se vaya a la siguiente linea del codigo
    //como no sabemos cual es, no podemos llamarla, por eso con next evitamos que se pare el codigo despues de shortid.generate()
    this.urlCorta = shortid.generate();
    next();
});
module.exports = mongoose.model('Urls', urlSchema);