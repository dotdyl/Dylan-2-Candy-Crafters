const db = require('./database/db-connector');
const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

const PORT = 5000;

/***  
 * 
 * READ ROUTES
 * 
 * ***/
app.get('/bsg-people', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT bsg_people.id, bsg_people.fname, bsg_people.lname, \
            bsg_planets.name AS 'homeworld', bsg_people.age FROM bsg_people \
            LEFT JOIN bsg_planets ON bsg_people.homeworld = bsg_planets.id;`;
        const query2 = 'SELECT * FROM bsg_planets;';
        const [people] = await db.query(query1);
        const [homeworlds] = await db.query(query2);

        res.status(200).json({ people, homeworlds });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

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
        const [inventorySpaces] = await db.query(query1);
        res.status(200).json({ inventorySpaces }); //send results to frontend
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
        const [orders] = await db.query(query1);
        res.status(200).json({ orders }); //send results to frontend
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