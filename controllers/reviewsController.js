const { Router } = require('express')
const { User, Writer, Book, Review } = require('../models')

const router = Router()

router.get('/:user_id', async (req, res) => {
    const allwriters = await Writer.findAll({ where: { user_id: req.params.user_id } })
    const allbooks = await Book.findAll({ where: { writer_id: allwriters.map(key => key.id) } })
    const reviews = await Review.findAll({ where: { book_id: allbooks.map(key => key.id) } })

    return res.json(reviews)
})

router.get('/:user_id/:writer_id/:book_id/:id'), async (req, res) => {
    const review = await Review.findByPk(req.params.id)

    if (review == null) {
        return res.status(400).json({error: 'This review cant be finded'})
    }

    return res.json(review)
}

router.post('/:user_id/:writer_id/:book_id', async (req, res) => {
    const book_id = req.params.book_id
    const { text } = req.body

    const book = await Book.findByPk(book_id)
    if (!book) {
        return res.status(400).json({ error: 'Book not found'})
    }

    const review = await Review.create({
        text,
        book_id
    })

    return res.json(review)
})

router.delete('/:user_id/:writer_id/:book_id/:id', async (req, res) => {
    await Review.destroy({ where: { id: req.params.id } })
    return res.json(`Resenha de id = ${req.params.id} deletado`)
})

router.put('/:user_id/:writer_id/:book_id/:id', async (req, res) => {
    const { text } = req.body
    await Review.update(
        { text }, { where: { id: req.params.id } }
    )
    const updatedreview = await Review.findByPk(req.params.id)
    return res.json(updatedreview)
})

module.exports = router