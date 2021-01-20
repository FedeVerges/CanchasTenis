const 	router=require('express').Router(), // IMPORT EXPRESS
		Sequelize=require('sequelize'),     // IMPORT SEQUELIZE ( U EL QUE SEA )
		Op=Sequelize.Op,
		fs=require('fs'),                   // ESTO ES UN GESTOR DE ARCHIVOS
        obj='OBJETO1'                       // UN STRING 

router.all('/*',(req,res,next)=>{           // ESTOS PARAMETROS LOS VEMOS CDO NOS JUNTEMOS PERO ESTA LA CONFIG DE LA CONECCION, ETC
	const modulo=req.originalUrl.split('/') // SEPARO URL POR '/' 
	switch(modulo[3]){                      // DEPENDE LA POSICION DE LA URL QUE PONGAMOS 
		case 'DIRECTORIO-DENTRO-DE-OBJETO1':                
                router.use('/'+modulo[3],require('./'+modulo[3])) // REDIRECCION ... 
            break;
        case 'proveedor':                                         // REDIRECCION ... 
                router.use('/'+modulo[3],require('./'+modulo[3]))
            break;
		default:                                                  // SI NO MATCHEA CON LOS DE ARRIBA TRAE EL ORM DE ESTE DIR
                req.models=require('./orm').relations(res.locals.conn)
            break;
	}
	next()     // NO SE QUE HACE, PERO SIRVE PARA QUE SE EJECUTEN LAS FUNCIONES DE ABAJO 
})

/*----------------------------------------------------
------------------------GET---------------------------
----------------------------------------------------*/
router.get('/',(req,res)=>{ 
	const 	Modelo=req.models.Modelo
	
	Modelo.findAndCountAll({
		attributes:['atr1', 'atr2'],
		where:{
			atr1:1
		},
		order:[['atr1','ASC']]
	}).then(data=>{
		//if(data.rows.length==0)
		//	res.status(404).send('Sin datos')
		//else 
		//	res.status(200).json(data)
	}).catch(err=>{
	  	console.log('Error al recuperar '+obj+'. '+err)
	})
})

module.exports=router;