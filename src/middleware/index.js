const { getUser } = require("../services")


// check user
const checkUser = (type) => async(req, res, next) => {
    try {
        const { body: { email } } = req // from body, trying to destructure the email to be the request
        const [ user ] = await getUser(email)

        if (type === 'login') {
            if (!user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Invalid credentials',
                    data: []
                })
            } else {
                req.user = user
                return next()
            }
        }
        if (user) {
            return res.status(400).json({
                status: 'fail',
                code: 400,
                message: 'User already exists. Log in',
                data: []
            })
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

// Validate user
const validateUser = (data, type) => async (req, res, next) => {
    try {
        const getType = {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        };
        const options = {
        language: { key: '{{key}}'}
        }
        const result = getType[type]
        const isValid = await data.schema.validate(result, options);
        if(!isValid.error) {
            req[type] = isValid.value;
            return next()
        }
        const { message } = isValid.error.details[0];
        return res.status(400).json({
            status: 'fail',
            message: message.replace(/[\"]/gi,""),
            errors: data.message
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    validateUser,
    checkUser
}