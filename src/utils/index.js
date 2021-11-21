const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
const crypto = require('crypto')
require('dotenv').config();

// encrypt password
const hashPassword = async password => {
    const encryptPassword = await bcrypt.hash(password, 12)
    return encryptPassword
}

const comparePassword = async(password, userPassword) => {
    const isValid = await bcrypt.compare(password, userPassword)
    return isValid
}

// generate token
const generateToken = async user => {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' }
        )

        return token
}

// validate token
const validateToken = async (token, type) => {
    try {
        return jwt.verify(token, type === 'logged-in' ? process.env.TOKEN_KEY: process.env.RESET_TOKEN_KEY)
    } catch (error) {
        return error
    }
}

module.exports = { 
    hashPassword,
    generateToken,
    validateToken,
    comparePassword
}