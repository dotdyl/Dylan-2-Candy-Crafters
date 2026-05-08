const db = require('./database/db-connector');
const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

const PORT = 5000;

app.get('/candies', async (req, res) => {
    try {
        //TODO: implement query req to db and return as above to frontend
        const query1 = 'SELECT * FROM candies;';
        const [candies] = await db.query(query1);
        res.status(200).json({ candies }); //send results to frontend
    }
    catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


app.get('/vendors', async (req, res) => {
    try {
        //TODO: implement query req to db and return as above to frontend
        const query1 = 'SELECT * FROM vendors;';
        const [vendors] = await db.query(query1);
        res.status(200).json({ vendors }); //send results to frontend
    }
    catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/inventory', async (req, res) => {
    try {
        //TODO: implement query req to db and return as above to frontend
        const query1 = 'SELECT * FROM inventorySpaces;';
        const query2 = 'SELECT * FROM candies;';
        const [inventorySpaces] = await db.query(query1);
        const [candies] = await db.query(query2)
        
        res.status(200).json({ inventorySpaces, candies }); //send results to frontend
    }
    catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


app.get('/orders', async (req, res) => {
    try {
        //TODO: implement query req to db and return as above to frontend
        const query1 = 'SELECT * FROM orders;';
        const query2 = 'SELECT * FROM vendors;';
        const query3 = 'SELECT * FROM candies;';
        const query4 = 'SELECT * FROM orderDetails;'
        const [orders] = await db.query(query1);
        const [vendors] = await db.query(query2);
        const [candies] = await db.query(query3);
        const [orderDetails] = await db.query(query4);
        res.status(200).json({ orders, candies, vendors, orderDetails }); //send results to frontend
    }
    catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});