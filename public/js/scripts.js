const formulario = document.querySelector('#agregar-url');
formulario.addEventListener('submit', async e => {
    e.preventDefault();
    const urlOriginal = document.querySelector('#urlOriginal').value;
    const respuesta = await fetch(e.target.action, {method: e.target.method,headers: {'Accept' : 'application/json','Content-Type' : 'application/json'},body: JSON.stringify({urlOriginal})});
    const resultado = await respuesta.json();
    const alertas = document.querySelector('.mensaje-url');
    if(alertas){document.querySelector('.mensaje-url').remove();};
    if(resultado.codigo === 201){
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url');
        let pathApp = window.location.href;
        console.log("pathApp: "+ pathApp);
        var urlAcortada = `${pathApp}${resultado.url}`;
        console.log("urlAcortada: "+ urlAcortada);
        mensaje.innerHTML = `<p>Se ha acortado correctamente la url, visita <a href="${resultado.url}" target="_blank" rel="noopener noreferrer" title="Ir a la URL acortada">Enlace</a>`+
                            `<br><input type="text" readonly placeholder="${urlAcortada}" value="${urlAcortada}" id="inputResultadoUrlAcortada" name="inputResultadoUrlAcortada">`+
                            `<button title="Copiar url" id="botonCopiarUrl"><i class="far fa-copy"><i></button></p>`;
       
        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
        document.getElementById('botonCopiarUrl').onclick = function(){
                let textoACopiar = document.getElementById('inputResultadoUrlAcortada').select();
                document.execCommand("copy");
                console.log("Se ha copiado el texto");
        };
    } else {
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url','error');
        mensaje.innerHTML = `<p>Se ha producido un error ${resultado.error} </p>`;
        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    }

});
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('error')){
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url','error');
    mensaje.innerHTML = `<p>La url no es válida</p>`;
    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
};