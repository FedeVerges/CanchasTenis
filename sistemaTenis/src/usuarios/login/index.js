const express = require('express'),
app = express(),
router = require('express').Router(),
Sequelize = require('sequelize'),     // IMPORT SEQUELIZE ( U EL QUE SEA )
Op = Sequelize.Op,
fs = require('fs'),                   // ESTO ES UN GESTOR DE ARCHIVOS
obj = 'Login';
//cosas router
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
//donde esta la consulta sequalize
// const userController = require("../usuarios/index.js");
//keys for each kind of user
const keySocio = "llave del socio";
const keyAdmin = "llave del admdinistrador";

// Middleware (se ejecuta antes de todas las peticiones)
//router.use(morgan("tiny")); // muestra por consola.
//router.use(express.json()); // convierte datos a json.


router.all('/*',(req,res,next)=>{ // ESTOS PARAMETROS LOS VEMOS CDO NOS JUNTEMOS PERO ESTA LA CONFIG DE LA CONECCION, ETC
	const modulo=req.originalUrl.split('/') // SEPARO URL POR '/'
	switch(modulo[3]){                      // DEPENDE LA POSICION DE LA URL QUE PONGAMOS
		case 'perfil':
                router.use('/'+modulo[3],require('./'+modulo[3])) // REDIRECCION A FOLDER DE ADENTRO...
            break;
		default:
                req.models=require('../orm').relations(res.locals.conn) //TRAE EL ORM DE USUARIOS
            break;
	}
	next()
})

/*----------------------------------------------------
------------------------POST--------------------------
----------------------------------------------------*/
router.post("/checkLogin",async (req, res) => { // LE SAQUE LO DEL ENSURETOKEN ... AGREGALO DSP

    const user = await getUser(req,res);
    var token;
    if(user.usuario != undefined){
      if(user.tipo == "SOCIO"){
        token = jwt.sign({user: user.usuario, id: user.id }, keySocio);
      }else{
        token = jwt.sign({user: user.usuario, id: user.id }, keyAdmin);
      }
      console.log(token);
      res.send({user:user, token:token}); //Agregaria codigo = 200
    }else{
      res.status(404).send("No user found");
    }
  });

  // consulta sql

  async function getUser(req,res){
    const usuario = await req.models.usuarios.findOne({
        where:{
            username: req.body.username,
            password: req.body.password
        }
    }).catch(err=>{
	  	console.log('Error al recuperar '+obj+'. '+err)
    });
    if(usuario==null){
        return {};
    }else{
        return {
            usuario : usuario.username,
            password : usuario.password,
            tipo : usuario.tipo,
        }
    }
    /* ESTO VA CUANDO HAGAMOS LOS ORM DE SOCIO Y ADMIN
    if(usuario==null){
        return {};
    }else{
        var socOadmin;
        if(usuario.tipo == "SOCIO"){
            socOadmin = await req.models.socio.findOne({
                where:{id_usuario: usuario.id}
            })
        }else{
            socOadmin = await req.models.admin.findOne({
                where:{id_usuario: usuario.id}
            })
        }
        return {
            usuario : usuario.username,
            password : usuario.password,
            tipo : usuario.tipo,
            id : socOadmin.id,
            apellido: socOadmin.apellido,
            nombre: socOadmin.nombre,
            documento: socOadmin.legajo
        }
    }
    */


}
// VERIFICA TOKEN
function ensureToken(req, res, next) {
    const token = req.headers["token"];
      if (typeof token !== "undefined") {
        req.token = token;
        next();
      } else {
        res.render("login.html");
        next();
      }
  }

  module.exports = router;
