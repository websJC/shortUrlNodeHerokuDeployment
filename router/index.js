const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

module.exports = () => {
    //get recibe la url que el user visita, post cuando envia un form p.ej
    //o put cuando alguien actualiza algo...
    //aquí podríamos poner todas las urls que necesitemos
    //Para no llenar esta parte usaremos MVC
    
    //router.get('/', --->>Desde aquí lo metemos en urlController -->(req,res) => {res.send("Hola mundo");});
    //router.get('/nosotros', --->>Desde aquí lo metemos en urlController -->(req,res) => {res.send("Nosotros");});

    router.get('/', urlController.home);
    //Para que reaccione al envío del formulario
    router.post('/', urlController.agregarUrl);

    //generamos url comodin para redireccionar a url original
    router.get('/:url', urlController.redireccionarUrl);

    return router;
}