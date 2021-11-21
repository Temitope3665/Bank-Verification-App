const queries = {
    signUpUser: `
        INSERT INTO users (
            firstName,
            lastName,
            email,
            password,
            isVerified,
            userToken
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `,
    getUser: `
        SELECT * FROM users
        WHERE email=$1
    `,
}

module.exports = queries