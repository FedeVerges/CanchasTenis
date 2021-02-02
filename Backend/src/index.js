const 	express = require('express'),
		//app = express(), NO NECESITAMOS EL EXPRESS PORQUE NO VAMOS A MANEJAR NINGUNA PETICION (GET,PUT,...,) 
		//solo vamos a redireccionar a donde corresponda y conectarnos a la BD.
		router=require('express').Router() // Esto es para seguir redireccionando

// Acá usamos el router
/**
 * 	use: - 1er Argumento: '/*' es lo primero que se ejecuta en esta hoja ...
 *  	 - 2do Argumento: una función anonima que puede tener parametros variados (porque JS lo permite)
 * PARAMETROS: (Pueden tener cualquier nombre pero convencionalmente se llaman asi)
 * 				req: Es un objeto(JSON) que trae toda la informacion sobre la peticion HTTP que llega,
 * 					 req.url: devuelve url
 * 					 req.method: te dice si es un 'GET,POST,...'
 * 					 req.headers: te da todos los headers (como puede ser un token)
 * 					 req.params: te da los parametros de la URL /parametro/:parametro, etcétera. <- req.params.parametro
 * 				res: Sería el Objeto que mandariamos en respuesta
 * 					 res.contentType('application/json'); // Para decirle el objeto que enviamos al navegador (no hace falta)
 * 					 res.send('') // FALTA DOC
 * 					 res.json({json:'json}) // FALTA DOC 
 * 					 res.locals // FALTA DOC
 * 				next:
 * 					 Este parametro sirve para pasarle el control o el 'foco' a la siguiente ruta que haga 'match' con la
 * 					 URL que viene en la peticion ... ya que en este caso la agarramos con el '/*' ...
 * 		
 */
router.use('/*',function(req,res,next){ 
	console.log("1-Index"); 
	res.locals.username='--' // NOSE 
	res.locals.privateKey='--'// NOSE 
	if(res.locals.prod) res.locals.conn = require('../config/connection').conn('Dit IP','USER ','BD ',' PASS ')
	else res.locals.conn=require('../config/connection').conn('localhost','root','bd-canchas','')
	const modulo = req.originalUrl.split('/') // separo URL localhots/api/src/Objeto1
	router.use('/'+modulo[2],require('./'+modulo[2])) // Direcciono a cualquier carpeta 
	next()
})

module.exports=router;
