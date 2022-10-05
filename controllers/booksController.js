
const { Router } = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { User, Writer, Book } = require('../models')
const fs = require('fs')

const storage = {
    dest: 'public/',
    storage: multer.diskStorage({
        destination: function (req, file, cb) {

            cb(null, 'public/')
        },
        filename: function (req, file, cb) {

            cb(null, `${file.originalname}`)
        }
    })
}

const router = Router()

router.post('/:user_id/:writer_id/:title/:name', multer(storage).single('cover'), async (req, res) => {
    const writer_id = req.params.writer_id
    const title = req.params.title
    let name_ = null
    let url_ = null
    if (req.file != undefined) {
        const { originalname: name, location: url = "static/" + name } = req.file;
        name_ = name
        url_ = url
    } else if (req.params.name != undefined) {
        const nameI = req.params.name
        const urlI = "static/" + nameI
        name_ = nameI
        url_ = urlI
    }
    const name = name_
    const url = url_

    const writer = await Writer.findByPk(writer_id)
    if (!writer) {
        return res.status(400).json({ error: 'Writer not found'})
    }
    
    const book = await Book.create({
        title,
        name,
        url,
        writer_id
    })

    return res.json(book)
})

router.put('/:user_id/:writer_id/:id/:title/:name', multer(storage).single('cover'), async (req, res) => {
    const title = req.params.title

    const writer_id = req.params.writer_id
    let name_ = req.params.name
    let url_ = "static/" + name_
    console.log('req.file', req.file)
    console.log('title',title)
    if (req.file != undefined ) {
        
        //cria nova img
        const { originalname: name, location: url = "static/" + name } = req.file;
        
        //excluir img de ./public
        const deleteBook = await Book.findByPk(req.params.id)
        fs.unlink('./public/' + deleteBook.name, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        })
        name_ = name
        url_ = url
    }
    const name = name_
    const url = url_


    if (title == 'undefined') {
        const updatedBook = await Book.update(
            { writer_id, name, url }, { where: { id: req.params.id }}
        )
    } else {
        const updatedBook = await Book.update(
            { title, writer_id, name, url }, { where: { id: req.params.id }}
        )
    }

    return res.json(updatedBook)
});

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

router.delete('/:user_id/:writer_id/:id/:delete_img', async (req, res) => {

    if (req.params.delete_img == true) {
        
        //excluir img de ./public
        const book = await Book.findByPk(req.params.id)
        fs.unlink('./public/' + book.name, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        })
    }

    await Book.destroy({ where: { id: req.params.id } })
    return res.json(`Livro de id = ${req.params.id} deletado`)
})

// 'router.put('/:user_id/:writer_id/:id', multer(storage).single('cover'), async (req, res) => {
//     const { title } = req.body
//     const { originalname: name, location: url = "public/" + name } = req.file;
    
//     await Book.update(
//         { title, name, url }, { where: { id: req.params.id }}
//     )
//     const updatedbook = await Book.findByPk(req.params.id)
//     return res.json(updatedbook)
// })'

module.exports = router