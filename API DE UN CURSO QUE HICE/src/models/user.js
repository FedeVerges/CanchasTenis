const Sequelize = require('Sequelize');

module.exports = (sequelize) => {

    const user = sequelize.define(
        'user', 
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dni: {
                type: Sequelize.INTEGER,
                unique: true
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
                field: "first_name"
            },
            lastName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    field: "last_name"
            },
            balance: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            estado: {
                type: Sequelize.ENUM('ACTIVO','BAJA'),
                allowNull: false,
                field: "estado"
            },
            createdAt: {
                type: Sequelize.DATE,
                field: "created_at"
            },
            updatedAt:  {
                    type: Sequelize.DATE,
                    field: "updated_at"
            }
        }, 
        { 
            tableName: 'users' 
        }
    );


    user.associate = (models) => {
        models.user.hasMany(models.transfer, { foreignKey: "payerId" });
    }


    return user;
}