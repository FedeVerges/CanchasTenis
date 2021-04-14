const Sequelize = require('sequelize')

const model = conn => {
  const usuarios = conn.define('usuarios', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // id_perfil:{
    //     type: Sequelize.INTEGER,
    //     allowNull:false
    // },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipo_esp: {
      type: Sequelize.ENUM('ADMIN', 'SOCIO')
    },
    estado_cuenta: {
      type: Sequelize.ENUM('DEUDOR', 'CANCELADO','SUSPENDIDO'),
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    state: {
      type: Sequelize.ENUM('ACTIVO', 'INACTIVO', 'BAJA')
    }
  })

  return {
    usuarios
  }
}
exports.model = model

exports.relations = conn => {
  const usuarios = model(conn).usuarios

  return {
    usuarios
  }
}