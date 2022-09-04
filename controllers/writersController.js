const { Router } = require('express')
const { User, Writer } = require('../models')

const router = Router()

router.post('/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    const { name } = req.body

    // Verifica se existe o usuario para adicionar um escritor referente ao mesmo
    const user = await User.findByPk(user_id); 
    if (!user) {
        return res.status(400).json({ error: 'User not found'})
    }

    const writer = await Writer.create({
        name,
        user_id
    })

    return res.json(writer)
})

router.get('/:user_id', async (req, res) => {
    const writers = await Writer.findAll({ where: { user_id: req.params.user_id } })

    return res.json(writers)
})

router.get('/:user_id/:id', async (req, res) => {

    const writer = await Writer.findByPk(req.params.id)

    // Verifica se o escritor chamado está dentro do usuario selecionado
    if (req.params.user_id != writer.user_id) {
        return res.status(400).json({error: 'This Id dont exist inside this user'})
    }

    return res.json(writer)
})

router.delete('/:user_id/:id', async (req, res) => {

    //Verifica se o escritor que se quer deletar está dentro do usuario
    const writer = await Writer.findByPk(req.params.id)
    if (req.params.user_id != writer.user_id) {
        return res.status(400).json({error: 'You cant delete a writer of another user'})
    }

    await Writer.destroy({ where: { id: req.params.id } })
    return res.json(`Escritor de Id = ${req.params.id} deletado`)
})

router.put('/:user_id/:id', async (req, res) => {

    //Verifica se o escritor que deseja atualizar pertence ao usuario
    const writer = await Writer.findByPk(req.params.id)
    if (req.params.user_id != writer.user_id) {
        return res.status(400).json({error: 'You cant update a writer of another user'})
    }

    const { name } = req.body
    await Writer.update(
        { name }, { where: {id: req.params.id} }
    )
    const updatedwriter = await Writer.findByPk(req.params.id)
    return res.json(updatedwriter)
})

module.exports = router;