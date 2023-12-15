const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler(async (req, res) => {

    //desestructuramos los datos que pasamos del body
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //verificamos si ese usuario existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Ese usuario ya fué registrado en la aplicación')
    }

    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creamos el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //si se creó correctamente, muestra los datos, de lo contrario manda mensaje de error
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo registrar al usuario')
    }

})

const loginUser = asyncHandler(async (req, res) => {
    //desestructuramos los datos del body
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //vamos a buscar a ese usuario
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales Incorrectas')
    }
})

const getUserData = asyncHandler(async (req, res) => {
    res.json(req.user)
})

//funcion para generar el JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '60m'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}