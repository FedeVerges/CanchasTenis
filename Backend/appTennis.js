const   express = require('express'), // IMPORTAR express (framework de enrutamiento)
		bodyParser = require("body-parser"), // IMPORTAR body-parser que sirve para parsear el body a JSON ...
		morgan = require("morgan"), //IMPORTAR morgan que sirve para escribir en consola las peticiones que entran a la API
        app = express(), // Inicializamos el servidor 
        api=require('./src');//Ruta donde esta la API 
        path = require('path')
//Configuraciones del Server
app.use(bodyParser.json());
app.use(bodyParser.json({limit:'5mb'}));
app.use('/api', api);
app.use(express.static(path))
app.engine('html', require('ejs').renderFile); //  esta es para que los archivos html sean renderizados por ejs.
app.set('views', path.join(__dirname,'views')); // __dirname da la direccion absoluta de este archivo // le digo donde esta la carpeta views
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs'); // Uso motor de la vista ejs. (mete js en html con sintaxis <%= %>)

//Esto es para que imprima las peticiones cuando llegan en la consola (un middelware o algo asi)
app.use(morgan('dev'));

app.set('port',3000); //Puerto de donde va a correr 
// Start the server
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'));
});