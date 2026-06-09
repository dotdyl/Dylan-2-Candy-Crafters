// Citation for the following module:
// Date: 05/28/2026
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209
const path = require('path');
const dotenv = require('dotenv')

const result = dotenv.config({
    path: path.resolve(__dirname, './.env')
});

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_database = process.env.DB_DATABASE

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : db_user,
    password          : db_password,
    database          : db_database
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;

// why not: 'export default pool' ?