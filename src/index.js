const express = require('express')
const db = require('./db')
const cors = require('cors')
const router = require('./route')
const cookieparser = require('cookie-parser')

const app = express()
const port = 2000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieparser())

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Welcome to Bank Verification app',
        data: []
    })
})

app.use(router)

app.use((req, res) => {
    res.send('Not Found')
})

app.use((error, req, res, next) => {
  console.log(error)
    res.status(500).json({
        status: 'failed',
        message: 'internal server error',
        data: []
    })
})

db.connect()
  .then((obj) => {
    app.listen(port, () => {
      obj.done();
      console.log(`starting on port ${port}`)
    });
  })
  .catch((error) => {
    console.log(error.message)
  });

module.exports = app