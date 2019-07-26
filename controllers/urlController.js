//Importamos el model URL
const Url = require('../models/Url');


//exports para poder exportar multiples funciones
exports.home = (req,res) => {
    res.render('index');
};
exports.agregarUrl = async (req,res,next) => {
    let respuesta;
    //control, para ver que recibimos lo que escribe el user
    console.log (req.body.urlOriginal);
    // url será una nueva instancia del modelo Url, donde le pasamos la urlOriginal, como el valor que ha introducido el user
    const url = new Url({ urlOriginal : req.body.urlOriginal });
    //usaremos un try catch
    try {
        //No hubo error
        //con await, cojemos la url y la guardamos en la bbdd
        let resultado = await url.save();
        //le mandamos respuesta al user
        respuesta = {
            //200 es todo ok, 201 es creado objeto
            codigo: 201,
            mensaje: 'Guardado Correctamente',
            url : resultado.urlCorta
        }

    } catch(error){
        //Hubo error, lo mostramos por consola, lo metemos en respuesta y le decimos al user
        //puede estar caida la bbdd, pueden ser erroneos los datos que recibimos, con error sabremos cual fue el error

        console.log(error);
        respuesta = {
            codigo: 400,
            error : 'Hubo un error'
        }
    }
    res.json(respuesta);
    next();
}
//Cuando el usuario visita la url corta
exports.redireccionarUrl = async (req,res,next) => {
    console.log(req.params.url);
    //buscamos en mongo por la url corta
    const url = await Url.findOne({ urlCorta : req.params.url });
    if(!url){
        res.redirect('/?error=404');
        next();
    }else {
        res.redirect(url.urlOriginal);
        next();
    }
}