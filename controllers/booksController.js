const { Router } = require('express')
const { User, Writer, Book } = require('../models')

const router = Router()

router.post('/:user_id/:writer_id', async (req, res) => {
    const writer_id = req.params.writer_id
    const { title, cover } = req.body

    const writer = await Writer.findByPk(writer_id)
    if (!writer) {
        return res.status(400).json({ error: 'Writer not found'})
    }

    const book = await Book.create({
        title,
        cover,
        writer_id
    })

    return res.json(book)
})

//todos os livros de um escritor
router.get('/:user_id/:writer_id', async (req, res) => {
    const books = await Book.findAll({ where: { writer_id: req.params.writer_id } })

    return res.json(books)
})

//todos os livros
router.get('/:user_id', async (req, res) => {
    const allwriters = await Writer.findAll({ where: { user_id: req.params.user_id } })
    const books = await Book.findAll({ where: { writer_id: allwriters.map(key => key.id) } })
    /// allwriters.map(key => key.id) -> percorre os escritorres deste usuario e retorna seus ids / ex: [10, 16, 24]

    return res.json(books)
})

//pega um livro
router.get('/:user_id/:writer_id/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id)

    if (book == null) {
        return res.status(400).json({error: 'This book cant be finded'})
    }

    return res.json(book)
})

router.delete('/:user_id/:writer_id/:id', async (req, res) => {
    await Book.destroy({ where: { id: req.params.id } })
    return res.json(`Livro de id = ${req.params.id} deletado`)
})

router.put('/:user_id/:writer_id/:id', async (req, res) => {
    const { title, cover } = req.body
    await Book.update(
        { title, cover }, { where: { id: req.params.id }}
    )
    const updatedbook = await Book.findByPk(req.params.id)
    return res.json(updatedbook)
})

module.exports = router