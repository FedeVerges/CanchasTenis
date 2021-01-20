const express = require('express');

const router = express.Router();
 
router.use('/*', (req, res, next) => {
    console.log('Entró petición');
    const recurso = req.originalUrl.split('/')[2];
    router.use('/'+recurso, require('./'+recurso));
    next();
});

module.exports = router;