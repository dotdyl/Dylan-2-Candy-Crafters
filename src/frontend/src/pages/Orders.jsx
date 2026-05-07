import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateOrderForm from '../components/CRUD_Orders/CreateOrder';



function Orders({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [orders, setOrders] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/orders');

            // Convert the response into JSON format
            const { orders } = await response.json();

            // Update the people state with the response data
            setOrders(orders);

        } catch (error) {
            // If the API call fails, print the error to the console
            console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>All Orders</h1>

            <table>
                <thead>
                    <tr>
                        {orders.length > 0 && Object.keys(orders[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((candy, index) => (
                        <TableRow key={index} rowObject={candy} backendURL={backendURL} refreshOrders={getData} />
                    ))}

                </tbody>
            </table>
            <CreateOrderForm></CreateOrderForm>
        </>
    )
} export default Orders;