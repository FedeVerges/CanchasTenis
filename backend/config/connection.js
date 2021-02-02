const Sequelize = require('sequelize')

//config coneccion a la db
exports.conn = function(host,user,bd,pass){
    const db = new Sequelize(bd,user,pass,{
      host:host,
      dialect: 'mysql',
      operatorsAliases: false,
      omitNull: true,
      pool: {
        max: 70,
        min: 0,
        idle: 10000
      },
      define: {
        freezeTableName: true
      }
    })

    db
      .authenticate()
      .then(()=>{
        console.log('Conectado....')
      })
      .catch(err => {
        console.error('Error al conectar con la DB:', err);
      })
    return db
}