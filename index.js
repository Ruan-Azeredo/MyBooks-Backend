const express = require('express')
const controllers = require('./controllers')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())

app.use(express.json('/users', controllers.users))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))