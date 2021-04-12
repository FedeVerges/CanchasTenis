const   express = require('express'), // IMPORTAR express (framework de enrutamiento)
		morgan = require("morgan"), //IMPORTAR morgan que sirve para escribir en consola las peticiones que entran a la API
        app = express(), // Inicializamos el servidor 
        api=require('./src'),//Ruta donde esta la API 
        path = require('path');

//Configuraciones del Server
//  CONFIGURACION
app.engine('html', require('ejs').renderFile); //  esta es para que los archivos html sean renderizados por ejs.
app.set('views', path.join(__dirname,'public')); // es para decirle donde estan los html.
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs'); // Uso motor de la vista ejs. (mete js en html con sintaxis <%= %>)

app.use('/api', api);

//Esto es para que imprima las peticiones cuando llegan en la consola (un middelware o algo asi)
app.use(morgan('dev'));

//Puerto de donde va a correr 
app.set('port', process.env.PORT || 3000);

// Start the server
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'));
});