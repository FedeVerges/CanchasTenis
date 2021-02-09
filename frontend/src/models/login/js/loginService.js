class loginService {

    constructor() {
        this.URI = '/api/login';
    }

    //  TODO: Cambiar usuario y contraseña por el objeto usuario.
    async loginUser(usuario, contrasenia) {
        //  Crear datos para enviar JSON
        const datos = {
            username: usuario,
            password: contrasenia
        };

        const res = await fetch(this.URI, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 
                // Agregamos headers para los metadatos de la peticion.
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        const datosUsuario = res.json;
        
        // }).then(function (response) {
        //     // Se ejecuta si salió todo bien y obtuvimos una respuesta de la API

        //     return response.json(); 

        //     // TODO: Dependiendo del codigo de respuesta, elaborar diferentes comportamientos.

        // }).catch(function (reason) {

        //     //En caso de algún error, por ejemplo que la API esté caída y no esté corriendo

        //     console.log(reason);

        //     // Informar error, mucho no se puede hacer
        //     setError(1);
        // });

        // Manejo de datos de autenticacion y session con JWT.


        // if(res != undefined && res.status != 404 && res.status != 403){
            
        //     localStorage.setItem("token", res.token); // Guardo token en localstorage
        //     localStorage.setItem("username",res.user.usuario);// Guardo usuario en localstorage
        //     window.location.href = localStorage.getItem("redirect"); // Esto redireccionaría a la pagina donde quiere loggearse el usuario
        //   }
    }

}

export default loginService;