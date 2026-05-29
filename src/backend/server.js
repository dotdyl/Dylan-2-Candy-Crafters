const db = require('./database/db-connector');
const express = require('express');
const dotenv = require('dotenv')

dotenv.config({path: "../frontend/.env"})

const app = express();
const cors = require('cors');

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

const PORT = process.env.VITE_BACKEND_PORT;

app.get('/load', async (req, res) => {
    try {
        //TODO: implement query req to db and return as above to frontend
        const query1 = 'CALL sp_load_candy_db();';
        const response = await db.query(query1);
        res.status(200).send("success"); //send results to frontend

    }
    catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/candies', async (req, res) => {
    try {
        //TODO: implement query req to db and return as above to frontend
        const query1 = 'SELECT * FROM Candies;';
        const [candies] = await db.query(query1);
        res.status(200).json({ candies }); //send results to frontend
    }
    catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.delete('/candies-delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `CALL sp_delete_candy_from_id(${id})`;
        const response = await db.query(query);
        res.status(200).json("candy deleted"); //send results to frontend
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
        const query1 = 'SELECT * FROM Vendors;';
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
        const query1 = 'SELECT * FROM InventorySpaces;';
        const query2 = 'SELECT * FROM Candies;';
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
        const query1 = 'SELECT * FROM Orders;';
        const query2 = 'SELECT * FROM Vendors;';
        const query3 = 'SELECT * FROM Candies;';
        const query4 = 'SELECT * FROM OrderDetails;'
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
