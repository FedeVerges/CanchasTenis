const express = require('express');
const router = express.Router();

const models = require('./../../models');
const Op = models.Sequelize.Op;
const  sequelize = models.sequelize;
const User =models.user;
const Transfer = models.transfer;
// localhost:3001/api/transfers 

router.get('/', async (req, res) => {
    
    let transfers = await Transfer.findAll();

    if (transfers.length == 0) {
        res.status(204).send(transfers);   
    } else {
        res.status(200).send(transfers);   
    }

});


router.get('/:id', async (req, res) => {
    
    let transfer = await Transfer.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!transfer) {
        res.status(204).send();   
    } else {
        res.status(200).send(transfer);   
    }
    
});

router.post('/', async (req,res)=> {
    try{
        let transfer = req.body, msg ='';

        if(transfer.payerId == transfer.collectorId)
            msg = 'las cuentas no deben coincidir;'
    
        if(transfer.amount <= 0)
            msg = 'el monto debe ser mayor a 0';
        
        let balance = await User.findOne({
            where: {
                id: transfer.payerId,
                balance: {
                    [Op.gte] : transfer.amount
                }
            }
        });
        if (!balance){
            msg+= "no hay balance";
        }

        if(msg == ''){
            let tr = await sequelize.transaction();
            try{
                
                await User.update({
                //    firstName: 'pedro',
                    balance: sequelize.literal(`balance - ${transfer.amount}`)
                }, {
                    where: {
                        id: transfer.payerId
                    },
                    transaction: tr
                });

                await User.update({
                    //    firstName: 'pedro',
                        balance: sequelize.literal(`balance + ${transfer.amount}`)
                    },{
                        where: {
                            id: transfer.collectorId
                        },
                        transaction: tr
                    });
                    
                transfer = await Transfer.create(transfer, { transaction: tr});
                tr.commit();
                res.status(201).json(transfer);    
            }catch(err){
                console.log(err);
                tr.rollback();
            }
        } else {
            res.status(400).json({ msg });
        }
    }catch (err){
        console.log(err);
        res.status(500).json({ msg: 'SERVER INTERNAL ERROR'})
    }
})

router.patch('/:id/:estado', async (req, res) => {
        let idAcambiar = req.params.id;
        let estadoAcambiar = req.params.estado;
        let transfer = await Transfer.findOne({
            where: {
                id: idAcambiar
            }
        });
        if (!transfer) {
            res.status(404).send({"No se ha podido encontrar la transferencia":"Not Found"});
        } else {
            if (estadoAcambiar == 'BAJA') {
                if (transfer.estado != 'BAJA') {
                    let tr = await sequelize.transaction();
                    try {
                        await Transfer.update({
                            estado: 'BAJA'
                        }, {
                            where: {
                                id: idAcambiar
                            },
                            transaction: tr
                        });
                        await User.update({
                            balance: sequelize.literal(`balance - ${transfer.amount}`)
                        }, {
                            where: {
                                id: transfer.collectorId
                            },
                            transaction: tr
                        });
                        await User.update({
                            balance: sequelize.literal(`balance + ${transfer.amount}`)
                        }, {
                            where: {
                                id: transfer.payerId
                            },
                            transaction: tr
                        });
                        tr.commit();
                        transfer.estado='BAJA'
                        res.status(200).json({ transfer });
                    } catch (err) {
                        console.log("se rompio");
                        tr.rollback();
                    }
                } else {
                    res.status(400).json({ msg: "Ya esta dado de baja" });
                }
            }else{
                res.status(400).json({ msg: "Escribi BAJA" });
            }
        }
});

module.exports = router;
