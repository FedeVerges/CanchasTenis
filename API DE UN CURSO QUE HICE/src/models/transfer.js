const Sequelize = require('sequelize');

module.exports = (sequelize) => { 

    const transfer = sequelize.define(
        'transfer', 
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            payerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: "payer_id"
            },
            collectorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: "collector_id"
            },
            amount: {
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
            tableName: 'transfers' 
        }
    );

    transfer.associate = (models) => {
        models.transfer.belongsTo(models.user, { foreignKey: 'payerId' , as: 'payer'});
        models.transfer.belongsTo(models.user, { foreignKey: 'collectorId', as:'collector' });
    }

    return transfer;
}