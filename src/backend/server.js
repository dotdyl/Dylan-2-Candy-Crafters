// Citation for the following module:
// Date: 05/28/2026
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209

const db = require('./database/db-connector');
const express = require('express');
const dotenv = require('dotenv')

dotenv.config({path: "../frontend/.env"})

const app = express();
const cors = require('cors');

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

const PORT = process.env.VITE_BACKEND_PORT;

app.get('/load', async (req, res) => {
    try {
        const query1 = 'CALL sp_load_candy_db();';
        const response = await db.query(query1);
        res.status(200).send("success");

    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/candies', async (req, res) => {
    try {
        const query1 = 'SELECT * FROM Candies;';
        const [candies] = await db.query(query1);
        res.status(200).json({ candies });
    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.delete('/candies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `CALL sp_delete_candy_from_id(${id})`;
        const response = await db.query(query);
        const result = response[0][0][0].result
        console.log(result);
        if (result != 'Candy deleted'){
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.delete('/orderDetails/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = `CALL sp_delete_order_detail_from_id(${id})`;
        const response = await db.query(query);
        const result = response[0][0][0].result
        console.log(result);
        if (result != 'Order Detail Deleted.'){
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


app.get('/vendors', async (req, res) => {
    try {
        const query1 = 'SELECT * FROM Vendors;';
        const [vendors] = await db.query(query1);
        res.status(200).json({ vendors });
    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/inventory', async (req, res) => {
    try {
        const query1 = 'SELECT * FROM v_inventorySpaces;';
        const query2 = 'SELECT * FROM Candies;';
        const [inventorySpaces] = await db.query(query1);
        const [candies] = await db.query(query2)

        res.status(200).json({ inventorySpaces, candies });
    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.put('/inventory', async (req, res) => {
    try {
        const body = req.body
        console.log("Body: ", body)
        const inventoryId = body.inventoryId
        const candyId = body.candyId
        const gallonsFilled = body.gallonsFilled
        const lastStocked = body.lastStocked
        const query = `CALL sp_update_order_detail_from_id(${inventoryId}, ${candyId}, ${gallonsFilled}, ${lastStocked})`
        const response = await db.query(query)
        const result = response[0][0][0].result
        console.log(result)
        if (result != 'Updated Inventory Space.'){
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
})

app.get('/orders', async (req, res) => {
    try {
        const query1 = 'SELECT * FROM v_orders;';
        const query2 = 'SELECT * FROM Vendors;';
        const query3 = 'SELECT * FROM Candies;';
        const query4 = 'SELECT * FROM OrderDetails;'
        const [orders] = await db.query(query1);
        const [vendors] = await db.query(query2);
        const [candies] = await db.query(query3);
        const [orderDetails] = await db.query(query4);
        res.status(200).json({ orders, candies, vendors, orderDetails });
    }
    catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.put('/orderDetails', async (req, res) => {
    try {
        const body = req.body
        console.log("Body: ", body)
        const orderDetailsId = body.orderDetailsId
        const orderId = body.orderId
        const candyId = body.candyId
        const orderWeightLbs = body.orderWeightLbs
        const unitPricePerLb = body.unitPricePerLb
        const lineTotal = body.lineTotal
        const query = `CALL sp_update_order_detail_from_id(${orderDetailsId}, ${orderId}, ${candyId}, ${orderWeightLbs}, ${unitPricePerLb}, ${lineTotal})`
        const response = await db.query(query)
        const result = response[0][0][0].result
        console.log(result)
        if (result != 'Updated Order Detail.'){
          res.status(400).json(result);
        } else {
          res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
})

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
