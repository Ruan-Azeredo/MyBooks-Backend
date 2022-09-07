const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/all', async (req, res) => {
    const users = await User.findAll();
    return res.json(users);
});

router.post('/create', async (req, res) => {
    const { name, email, password, photo } = req.body;
    const newuser = await User.create({ name, email, password, photo });
    return res.json(newuser);
});

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    return res.json(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.destroy({ where: { id: req.params.id } });
    id = req.params.id;
    return res.json(`Usuario de id = ${id} deletado`);
});

router.put('/:id', async (req, res) => {
    const { name, email, password, photo } = req.body;
    await User.update(
        { name, email, password, photo }, { where: { id: req.params.id } }
    );
    const updateuser = await User.findByPk(req.params.id);
    return res.json(updateuser)
});

router.get('/alreadyregistered/:email', async (req, res) => {
    const user = await User.findAll({ where: { email: req.params.email } })
    console.log(user.email)
    if (user[0] == null) {
        return res.status(400).json({ error: 'usuario com este email ainda não existe'})
    } else {
        return res.json(user)
    }
})

module.exports = router;