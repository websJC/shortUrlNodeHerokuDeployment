const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./router');

//importar variables de entorno locales
require('dotenv').config({ path:'variables.env'});



const app = express();

//Body parser para leer los datos del form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//Contectar con mongo
//Promise requerido por mongo
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

//Habilitamos PUG
app.set('view engine', 'pug');

//Donde encontrará las vistas
app.set('views', path.join(__dirname, './views'));

//Donde encontrará los archivos de estilos publicos
app.use(express.static('public'));

//Definimos rutas de la aplicacion
app.use('/', routes());

// Original app.listen(3000);
//Para Heroku, cogerá el host de variables de entorno o 0.0.0.0 lo cual
//le facilitará a la app coger el que le asigne Heroku
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host, () => {
    console.log(`Servidor en el puerto:`)
});
