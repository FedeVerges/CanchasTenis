var Sequelize = require('sequelize');
var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(__filename); // __filename = index.js 
var config    = require(__dirname + '/../config/config.js'); // __dirame = ../src/models
var db        = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config.params);
    
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

    /*db['user'] = user;
    db['transfer'] = transfer
    db['sequelize'] = sequelize
    db['Sequelize'] = Sequelize ;*/

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
