const { userSignup, validatePassword, getUser } = require("../services")
const axios = require('axios')
const nodemailer = require('nodemailer')


const registerUser = async(req, res, next) => {
    try {
        const { body } = req
        const createUser = await userSignup(body)
        const { password, ...user} = createUser

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        // send verification mail to user
        const mailOptions = {
            from: ' "Verify your Email" <aroyewontope@gmail.com>',
            to: user.email,
            subject: `Verify your email`,
            html: `<h2>Dear ${user.firstname}, thank you for registering on our website</h2>
                <h4>Please verify your email to continue...</h4>
                <a href="http://localhost:8080/user-verified"> Click here to verify your email </a>
            `
        }

        // http://${req.headers.host}/user/verify-email?token${user.usertoken}

        // sending email
        transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Verification email sent to your gmail')
            }
        })

        res.status(200).json({
            status: 'success',
            message: `User created successfully, check your email for verification`,
            data: user
        })
    } catch (error) {
        return next(error)
    }
}

// user.isVerified = true

const loginUser = async(req, res, next) => {
    try {
        const { user, body: { password }  } = req // from my body, extracting password
        const validated = await validatePassword(user, password)
        if (!validated) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(200).json({
                status: 'success',
                code: 200,
                message: 'User logged in successfully',
                data: validated
            })
        }
    } catch (error) {
        return next(error)
    }
}

const verifyUserAccount = async (req, res) => {
    try {
        const { accountNumber, bankCode } = req.query;
        const { data:{ data }} = await axios.get(`${process.env.PAYSTACK_VERIFY_ACCOUNT_URL}?account_number=${accountNumber}&bank_code=${bankCode}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`
            }
        }); 
        return res.status(200).json({
            message: 'Account successfully verified.',
            data: {
                accountName: data.account_name,
                accountNumber: data.account_number
            }
        })
    } catch (error) {
        const message = error?.response?.data?.message || error.message;
        return res.status(400).json({
            message
        })
    }
}

// const verifyEmail = async (req, res, next) =>{
//     try {
//        const user = await getUser({ email : req.body.email})
//        if (user.isVerified) {
//            console.log('email verified')
//            return next()
//        }
//     } catch (error) {
//         res.status(401).json({
//             status: 'fail',
//             message: 'Please check your email to verify your account'
//         })
//     }
// }

const logout = async(req, res, next) => {
    res.cookie('access-token', '', { maxAge: 1 })

    return next()
}

module.exports = {
    registerUser,
    loginUser,
    logout,
    verifyUserAccount
}