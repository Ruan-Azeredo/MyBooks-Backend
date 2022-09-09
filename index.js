const express = require('express')
const controllers = require('./controllers')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = 3001

app.use(bodyParser.json());
app.use(cors())

app.use('/users', controllers.users)
app.use('/users/writers', controllers.writers)
app.use('/users/books', controllers.books)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))