const express = require('express');
const router = express.Router();

const models = require('./../../models');

const User = models.user;
const Transfer = models.transfer;

// localhost:3001/api/users

router.get('/', async (req, res) => {
    
    console.log(models);

    let users = await User.findAll();

    if (users.length == 0) {
        res.status(204).send(users);   
    } else {
        res.status(200).send(users);   
    }

});


router.get('/:id', async (req, res) => {
    try {

        let user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            res.status(204).send();   
        } else {
            res.status(200).send(user);   
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'SERVER INTERNAL ERROR' });
    }
    
});

router.get('/:id/transfers', async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: [],
            where: {
                id: req.params.id
            },
            include: {
                model: Transfer,
                attributes: { exclude: ['payerId','createdAt', 'updatedAt'] }
            }
        });

        if (!user) {
            res.status(204).send();   
        } else {
            res.status(200).send(user.transfers);   
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'SERVER INTERNAL ERROR' });
    }

});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        await User.create(user);
        
        res.status(201).json(body);

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'SERVER INTERNAL ERROR'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const nuevoUser = req.body;
        const idUser = req.params.id;
        let user = await User.findOne({
            where:{
                id: idUser
            }
        });
        if(!user){
            res.status(404).json({msg:"El usuario no existe"});
        }else{
            await User.update(nuevoUser,{
                where:{
                    id: idUser
                }
            });
            nuevoUser.id = idUser;
            res.status(200).json(nuevoUser);
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"pasaron cosas"});
    }
});

module.exports = router;