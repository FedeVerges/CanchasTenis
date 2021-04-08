class BarraNavegacion {

    constructor(id) {
        this.id = id;
        this.rutas = []; // Traer las rutas desde un archivo de configuración.
        this.listaElementosNavegacion = []
    }

    agregarRuta(nombreRuta) {
        this.rutas.push(nombreRuta)
    }
    
    // Metodo para consultar los permisos.
    // Dependiendo del permiso. Son los botones que muestro.

    // Renderiza la barra de navegación.
    render() {
        const barraNavegacionContainer = document.querySelector('.barra-navegacion');
        const navbarLogo = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="./Index.html">La Strega</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> `;
        const listaNavegacionInicial = `
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"> `;

        const sobreNosotrosElem = ` 
        
        <li class="nav-item">
            <a class="nav-link" href="./sobreNosotros.html">Sobre nosotros <span class="sr-only">(current)</span></a>
        </li> `;

        const listaNavegacion = [sobreNosotrosElem]

        this.listaElementosNavegacion.forEach((elemento)=>{
            listaNavegacion.push(elemento)

        });

        const finBarraNavegacion = `
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <a id = "boton-reserva" class="btn btn-outline-success my-2 my-sm-0 " onclick=redirectButtonReserva() type="submit">Reserva
                tu cancha </a>
            </form>
        </div> 
        </nav> `;

        const barraNavegacion = navbarLogo.concat(listaNavegacionInicial,listaNavegacion.join(''),finBarraNavegacion)
        barraNavegacionContainer.innerHTML = barraNavegacion;
    }

    crearReferencia(classes, href, value) {

        // Creo la referencia 'a' a la siguiente pagina.
        const referencia = document.createElement('a');
        classes.forEach((valorClase)=>{
            referencia.classList.add(valorClase)
        });
        referencia.href = href
        referencia.innerText = value

        // Creo el elemento de lista 'li'
        const elementoLista = document.createElement('li');
        elementoLista.classList.add('nav-item');

        // console.log(elementoLista.innerHTML)

        
        // Agrego la referencia a la lista.
        elementoLista.appendChild(referencia)
        this.listaElementosNavegacion.push(elementoLista.outerHTML);

        // console.log(this.listaElementosNavegacion)


        this.render();

    }

}

// Pedir informacion al servidor y crear barra de navegacion con la información.
const barraNavegacion = new BarraNavegacion('barraNavegacion');
barraNavegacion.render();
barraNavegacion.crearReferencia(['nav-link'],'socios.html','Panel de Socios');





