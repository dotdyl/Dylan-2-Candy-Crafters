// Citation for the following module:
// Date: 06/08/2026
// Based on: Structure of GET requests calling in "getData()", OSU CS340 Pages
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188

import { useState, useEffect } from "react"; // Importing useState for managing state in the component
import TableRow from "../components/TableRow";
import CreateOrderForm from "../components/CRUD_Orders/FormCreateOrder";
import UpdateOrderDetailForm from "../components/CRUD_Orders/FormUpdateOrderDetail"

function Orders({ backendURL }) {

    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([])
    const [candies, setCandies] = useState([]);
    const [vendors, setVendors] = useState([]);

    const [orderDetailsToView, setOrderDetailsToView] = useState(0)

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

    const onDeleteOrderDetail = async (id) => {
      try {
        const response = await fetch(backendURL + `/orderDetails/${id}`, {method: 'DELETE'});
        if (response.status == 200) {
            getData();
        } else {
            const text = await response.json()
            alert(text)
        }
      } catch (err) {
        console.log(err);
      }
    }

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
                            {orders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    rowObject={order}
                                    backendURL={backendURL}
                                    refreshOrders={getData}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h1 className='text-xl font-bold text-base-content'>View Order Details for an Order</h1>
            <div className="form-control w-full max-w-[250px]">
                <select name="viewOrderDetailsByOrder" id="viewOrderDetailsByOrder" className="select select-bordered select-primary select-sm w-full" defaultValue="" onChange={e => {console.log(e.target.value); setOrderDetailsToView(JSON.parse(e.target.value))}}>
                    <option  disabled hidden value="">Select an Order</option>
                    {orders.map((order) => (
                        <option key={order.orderId} value={JSON.stringify(order.orderId)}>
                            {order.orderId}
                        </option>
                    ))}
                </select>
            </div>

            {orderDetailsToView != 0 && <div className='card bg-base-100 max-w-full border border-base-300 shadow-md mb-6'>
                <div className='card-body'>
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
                            {(orderDetails.filter((detail) => (detail.orderId === orderDetailsToView)).map((detail, index) => (
                                <TableRow
                                    key={index}
                                    rowObject={{
                                        ...detail,
                                        candyId: `${detail.candyId} - ${candies.find(candy => candy.candyId === detail.candyId)?.candyName || 'Unknown'}`
                                    }}
                                    backendURL={backendURL}
                                    refreshOrders={getData}
                                    onDelete={onDeleteOrderDetail}
                                />
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>}
            <CreateOrderForm backendURL={backendURL} vendors={vendors} candies={candies} orders={orders}></CreateOrderForm>
            <UpdateOrderDetailForm backendURL={backendURL} candies={candies} orderDetails={orderDetails} orders={orders} getData={getData}/>
        </>
    );
}
export default Orders;
