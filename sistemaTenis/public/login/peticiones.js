async function postUser(body){ // En este caso se hace un "POST" ya que los datos que enviamos son privados y no podemos enviarlos en URL.
  // Esperamos la respuesta del "fetch".
  let responseJSON = await fetch('http://localhost:3000/api/login', { // Determinamos el path correspondiente a la API o (EI PI AI)
    // El fetch = AJAX calls
        method: 'POST', // or 'PUT'   -> DETERMINAMOS EL TIPO DE LA PETICION
        body: JSON.stringify(body), // data can be `string` or {object}!
        headers:{
          //Se usa para metadatos, por ejemplo aca le especificamos que tipo de dato (JSON) y eso del charset  ...
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(function(response) { // Se ejecuta si salió todo bien y obtuvimos una respuesta de la API
            return response.json(); //Retorno como JSON los datos de la API

      }).catch(function(reason) { //En caso de algún error, por ejemplo que la API esté caída y no esté corriendo
        console.log(reason); // Informar error, mucho no se puede hacer
        return undefined;
     });
}