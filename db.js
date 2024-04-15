const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'KADELO_DB',
    password: 'zaq1@WSX',
    port: 5432,
})

module.exports = pool;