const 	express = require('express'),
		app = express(),
		router=require('express').Router()

router.use('/*',function(req,res,next){
	res.locals.username='--' // NOSE 
	res.locals.privateKey='--'// NOSE 
	if(res.locals.prod) res.locals.conn=require('../config/connection').conn('Dit IP','USER ','BD ',' PASS ')
	else res.locals.conn=require('./connect').conn(' OTRA DiR IP','OTRO USER ',' OTRA BD ','OTRA PASS ')

	const modulo=req.originalUrl.split('/') // separo URL
	router.use('/'+modulo[2],require('./'+modulo[2])) // Direcciono a cualquier carpeta 
	next()
})

module.exports=router;
