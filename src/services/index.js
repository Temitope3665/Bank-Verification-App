const db = require("../db");
const queries = require("../db/queries");
const crypto = require('crypto')
const cookie = require('cookie-parser')
const { hashPassword, randomString, generateToken, comparePassword } = require("../utils");

// user signup
const userSignup = async(body) => {
    const { firstName, lastName, email, password } = body
    const encryptPassword = await hashPassword(password)
    const emailToken = crypto.randomBytes(64).toString('hex')
    const isVerified = false
    // const generateString = generateToken()
    
    const payload = [ firstName, lastName, email, encryptPassword, isVerified, emailToken ]
    return db.one(queries.signUpUser, payload)
}

// Validate password
const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)
    if (isValid) {
        const token = await generateToken(user)
        const storeToken = cookie('access-token', token)
        if (storeToken) {
            return { token }
        }
        
    }
    return false
}

// get user
const getUser = email => db.any(queries.getUser, email)

module.exports = {
    userSignup,
    getUser,
    validatePassword
}