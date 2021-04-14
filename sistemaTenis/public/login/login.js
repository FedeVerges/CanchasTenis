async function login() {
  //get usuario
  var user = document.getElementById('usuario'); // Busca elemento del HTML por "id", (Crea como un "objeto")
  user = user.value;// para obtener el valor del coso de texto
  //get contraseña
  var pass = document.getElementById('password');
  pass = pass.value;
  const data = { // Creamos JSON para enviar a la API y no den el OK de validación
    username: user,
    password: pass
  }; // IGUAL SIRVE PARA DAR DE ALTA
  let responseJSON = await postUser(data); //funcion de peticiones.js
  console.log(responseJSON);
  manejoRespuesta(responseJSON);
}

function redirectButtonReserva() {
  // Obtener el boton de reservar.
  const botonReserva = document.getElementById("boton-reserva");
  // Dependiendo de si está loggeado, cargo el login o no.
  window.location.href = ("/login/login.html");

}
function manejoRespuesta(response) {
  if (response != undefined) {
    switch (response.status) {
      case 201:
        console.log("201 - OK ");
        localStorage.setItem("token", responseJSON.token); // Guardo token en localstorage
        localStorage.setItem("username",responseJSON.user.usuario);// Guardo usuario en localstorage
        window.location.href = localStorage.getItem("redirect"); // Esto redireccionaría a la pagina donde quiere loggearse el usuario
        break;
      case 404:
      case 403:
        console.log("404/403 - NO ");
        setError(1);
        break;
      default:
        console.log("por defecto");
        break;
    }
  } else {
    console.log("VINO NULL - POR QUE NO ESTA ESTA RUTA EN LA API");
    setError(1);
  }
}
function setError(i){ // ESTO ES UN CARTEL OA
  span = document.getElementById("spanError");
  span.style.opacity = i;
}
