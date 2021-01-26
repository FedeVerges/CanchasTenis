const   express = require('express'),
        bodyParser = require("body-parser"),
        app = express(),
        api=require('./src');

app.use(bodyParser.json());
app.use(bodyParser.json({limit:'5mb'}))

app.use('/api', api);

app.listen(3001, () => {
    console.log('Servidor en puerto 3001');
});


/*
app.use(function(req,res,next){
	res.locals.prod=false
	res.header("access-Control-Allow-Origin","*")
	res.header("access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,ip,db,user,pass")
	res.header("access-Control-Allow-Methods","POST,PUT,PATCH,GET,DELETE")
	if ('OPTIONS' === req.method) {
		res.sendStatus(200)
		return
	}
	next()

})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(root))

*/
