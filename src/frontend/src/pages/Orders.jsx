import { useState, useEffect } from "react"; // Importing useState for managing state in the component
import TableRow from "../components/TableRow";
import CreateOrderForm from "../components/CRUD_Orders/FormCreateOrder";
import UpdateOrderForm from "../components/CRUD_Orders/FormUpdateOrder";
import UpdateOrderDetailForm from "../components/CRUD_Orders/FormUpdateOrderDetail";
import CreateOrderDetailForm from "../components/CRUD_Orders/FormCreateOrderDetail";

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
            <div className='card bg-base-100 max-w-full border border-base-300 shadow-md mb-6'>
                <div className='card-body'>
                    <h1 className='text-xl font-bold text-base-content'>All Orders</h1>

                    {/*Orders Table*/}
                    <table className='table table-zebra'>
                        <thead className='text-base text-primary'>
                            <tr>
                                {orders.length > 0 &&
                                    Object.keys(orders[0]).map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {/*Use '...' to SPREAD the detail OBJ across its pieces/subfields, one of these is candyID, we now can change it dynamically.*/}
                            {orders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    rowObject={{
                                        ...order,
                                        vendorId: `${order.vendorId} - ${vendors.find(v => v.vendorId === order.vendorId)?.vendorName || 'Unknown'}`
                                    }}
                                    backendURL={backendURL}
                                    refreshOrders={getData}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='card bg-base-100 max-w-full border border-base-300 shadow-md mb-6'>
                <div className='card-body'>
                    <h1 className='text-xl font-bold text-base-content'>All Order Details</h1>
                    <table className='table table-zebra'>
                        <thead className='text-base text-primary'>
                            <tr>
                                {orderDetails.length > 0 &&
                                    Object.keys(orderDetails[0]).map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {/*Use '...' to SPREAD the detail OBJ across its pieces/subfields, one of these is candyID, we now can change it dynamically.*/}
                            {orderDetails.map((detail, index) => (
                                <TableRow
                                    key={index}
                                    rowObject={{
                                        ...detail,
                                        candyId: `${detail.candyId} - ${candies.find(candy => candy.candyId === detail.candyId)?.candyName || 'Unknown'}`
                                    }}
                                    backendURL={backendURL}
                                    refreshOrders={getData}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateOrderForm vendors={vendors} candies={candies} orders={orders}></CreateOrderForm>
            {/*Not necessary, probably, but the form was made: <UpdateOrderForm vendors={vendors} candies={candies} orders={orders} orderDetails={orderDetails}></UpdateOrderForm>*/}
            <div className="mt-4 mb-2 ml-1">
                <h2 className="text-lg font-bold text-base-content">Create an Order Detail</h2>
            </div>
            <CreateOrderDetailForm candies={candies} orders={orders}></CreateOrderDetailForm>
            <UpdateOrderDetailForm candies={candies} orderDetails={orderDetails} orders={orders} />
        </>
    );
}
export default Orders;
