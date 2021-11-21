const dotenv = require('dotenv')
const pgp = require('pg-promise')
const promise = require('bluebird')

dotenv.config()

const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg(process.env.DATABASE_URL);

module.exports = db