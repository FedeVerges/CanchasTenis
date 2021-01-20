const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use('/api', require('./src/routes'));

app.listen(3001, () => {
    console.log('Servidor en puerto 3001');
});