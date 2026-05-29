// Citation for the following module:
// Date: 05/38/2026
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209

const express = require('express');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config({path : './.env'})

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.VITE_FRONTEND_PORT;

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});