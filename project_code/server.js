// Placeholder server code from express as recommended by the instructions
// Will be updated based of our database later

const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

const config = {
    db: { /* do not put password or any sensitive info here, done only for demo */
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
    }
};

const pool = new Pool(config);

function getUser(id) {
    return {
        "id": id,
        "first_name": faker.name.firstName(),
        "last_name": faker.name.lastName(),
        "email": faker.internet.email()
    };
}

function getAllUsers() {
    return [
        {
        "id": faker.id,
        "first_name": faker.name.firstName(),
        "last_name": faker.name.lastName(),
        "email": faker.internet.email()
    },
    {
        "id": faker.id,
        "first_name": faker.name.firstName(),
        "last_name": faker.name.lastName(),
        "email": faker.internet.email()
    },
    {
        "id": faker.id,
        "first_name": faker.name.firstName(),
        "last_name": faker.name.lastName(),
        "email": faker.internet.email()
    },
    {
        "id": faker.id,
        "first_name": faker.name.firstName(),
        "last_name": faker.name.lastName(),
        "email": faker.internet.email()
    }

];
}

function updateUser(body, params) {
    const req = JSON.parse(body);
    const query = JSON.parse(params);
    return {
        "status": 'success',
    };
}

async function query(query, params) {
    const { rows, fields } = await pool.query(query, params);
    return rows;
}

async function createUser(quote) {
    const result = await query(
        'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
        [quote.quote, quote.author]
    );
    let message = 'Error in creating quote';

    if (result.length) {
        message = 'Quote created successfully';
    }

    return { message };
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
}