const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea el email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea tu password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)