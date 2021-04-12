const 	router = require('express').Router(), // IMPORT EXPRESS
		Sequelize = require('sequelize'),     // IMPORT SEQUELIZE ( U EL QUE SEA )
		Op = Sequelize.Op,
		fs = require('fs'),                   // ESTO ES UN GESTOR DE ARCHIVOS
        obj = 'Usuarios'                       // UN STRING

router.all('/*',(req,res,next) =>{           // ESTOS PARAMETROS LOS VEMOS CDO NOS JUNTEMOS PERO ESTA LA CONFIG DE LA CONECCION, ETC
	const modulo=req.originalUrl.split('/') // SEPARO URL POR '/'
	switch(modulo[3]){                      // DEPENDE LA POSICION DE LA URL QUE PONGAMOS
		case 'login':
                router.use('/'+modulo[3],require('./'+modulo[3])) // REDIRECCION A FOLDER DE ADENTRO...
            break;
		default:                                                  // SI NO MATCHEA CON LOS DE ARRIBA TRAE EL ORM DE ESTE DIR
                req.models=require('./orm').relations(res.locals.conn)
            break;
	}
	next()     // PERO SIRVE PARA QUE SE EJECUTEN LAS FUNCIONES DE ABAJO
})

/*----------------------------------------------------
------------------------GET---------------------------
----------------------------------------------------*/
router.get('/',(req,res)=>{
	const 	Usuarios=req.models.usuarios

	Usuarios.findAll({
		attributes:['id','id_perfil','username','password','tipo'],
		where:{
			state: 'ACTIVO'
		},
		order:[['id','ASC']]
	}).then(data=>{
		console.log('unsustobarbaro');
		if(data.length==0)
			res.status(404).send('Sin datos')
		else
			res.status(200).json(data)
	}).catch(err=>{
	  	console.log('Error al recuperar '+obj+'. '+err)
	})
})

/*----------------------------------------------------
------------------------POST--------------------------
----------------------------------------------------*/

router.post('/',(req,res)=>{
	const 	Usuarios=req.models.usuarios,
			body = req.body;

	Usuarios.create({
		id_perfil:body.id_perfil,
		username:body.username,
		password:body.password,
		tipo:body.tipo,
		estado:body.estado
	}).then(data=>{
		console.log('unsustobarbaro');
		res.status(201).send('Insertado correctamente.');
	}).catch(err=>{
		res.status(400).send('Error al insertar'+obj+'. '+err);
	  	console.log('Error al recuperar '+obj+'. '+err)
	})
});

module.exports=router;
