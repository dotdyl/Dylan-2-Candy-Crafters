import { useState, useEffect } from "react"; // Importing useState for managing state in the component
import TableRow from "../components/TableRow";
import CreateOrderForm from "../components/CRUD_Orders/FormCreateOrder";
import UpdateOrderDetailForm from "../components/CRUD_Orders/FormUpdateOrderDetail";

function Orders({ backendURL }) {

    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([])
    const [candies, setCandies] = useState([]);
    const [vendors, setVendors] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + "/orders");

            // Convert the response into JSON format
            const { orders, candies, vendors, orderDetails } = await response.json();

            // Update the various state variables with the new response data
            setOrders(orders);
            setVendors(vendors);
            setCandies(candies);
            setOrderDetails(orderDetails)
            console.log("Candies is:", candies) //todo what is up 
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

            {/*Orders Table*/}
            <table>
                <thead>
                    <tr>
                        {orders.length > 0 &&
                            Object.keys(orders[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((candy, index) => (
                        <TableRow
                            key={index}
                            rowObject={candy}
                            backendURL={backendURL}
                            refreshOrders={getData}
                        />
                    ))}
                </tbody>
            </table>
            <br></br>
            {/*Order Details Table*/}
            <h1>All Order Details</h1>
            <table>
                <thead>
                    <tr>
                        {orderDetails.length > 0 &&
                            Object.keys(orderDetails[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orderDetails.map((detail, index) => (
                        <TableRow
                            key={index}
                            rowObject={{
                                detail,
                                candyId: `${detail.candyId} ("${candies.find(candy => candy.candyId === detail.candyId)?.candyName|| 'Unknown'}")`
                            }}
                            backendURL={backendURL}
                            refreshOrders={getData}
                        />
                    ))}
                </tbody>
            </table>
            <CreateOrderForm vendors={vendors} candies={candies}></CreateOrderForm>
            <UpdateOrderDetailForm candies={candies} orderDetails={orderDetails} orders={orders}/>
        </>
    );
}
export default Orders;
