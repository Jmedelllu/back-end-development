const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const menuController = require("./restaurant/menu/menu.controller");
const userController = require("./restaurant/user/user.controller");

const hostname = '127.0.0.1'
const port = 3000

//cors
app.use(cors(
    {
        origin: 'http://127.0.0.1:5500',
        credentials: true
    }
))

//morgan
app.use(morgan('combined'))

//body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.post('/login', (req, res) => {
    const {username, password} = req.body
    res.json(
        {
            status: "success",
            data: {
                username: username,
                password: password
            }
        }
    )
})

//home
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to our Restaurant"
    })
})

//Menu Controller
app.use('/menu', menuController),
app.use('/user', userController);


//routing 404
app.use((req, res, next) => {
    res.status(404).json({
        status: "Error",
        message: "Resource tidak ditemukan",
    })
    next()
})

//error handling
const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        status : "error",
        message : "terjadi kesalahan pada server"
    })
}
app.use(errorHandling)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
