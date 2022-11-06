// Sample Placeholder Template Code From Web
// Will be changed to be adapted to our project later

const { Pool } = require('pg');

const config = {
    db: { /* do not put password or any sensitive info here, done only for demo */
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
    },
    listPerPage: LIST_PER_PAGE || 10,
};

const pool = new Pool(config);

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 **/

async function query(query, params) {
    const { rows, fields } = await pool.query(query, params);

    return rows;
}

async function createUser(quote) {
    const result = await query(
        'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING',
        [quote.quote, quote.author]
    );
    let message = 'Error in creating quote';

    if (result.length) {
        message = 'Quote created successfully';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create
}