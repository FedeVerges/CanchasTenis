const Sequelize = require('sequelize')

exports.relations=conn=>{
  const usuarios=require('../usuarios/orm').model(conn).usuarios;

  return{
    usuarios
  }
}
