import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client"
import CreateOrderDetailForm from "./FormCreateOrderDetail";

const UpdateOrderForm = ({ vendors, candies, backendURL, orders, orderDetails}) => {
    // Placeholder values for the read-only fields
    // In a real app, these would be variables or state like {calculatedSubtotal}
    const placeholderValue = 0;
    const currentDate = new Date().toISOString().split('Z')[0]; // YYYY-MM-DD format

    const [updateOrder, setUpdateOrder] = useState({})
    const [nOVendor, setnOVendor] = useState(0)
    const [details, setDetails] = useState([])
    const [subTotal, setSubTotal] = useState(0.0)
    const [shippingCost, setShippingCost] = useState(0.0)
    const [taxPct, setTaxPct] = useState(0.0)
    const [taxAmt, setTaxAmt] = useState(0.0)
    const [totalDue, setTotalDue] = useState(0.0)

    const addOrder = async () => {

        const response = await fetch(backendURL + '/bsg-people', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: {/*Need to structure a json object that will get sent here*/}
        })

    }

    const autofill = () => {
        
        if (Object.keys(updateOrder).length !== 0){
            const matchVendor = vendors.filter(v => {
            const vendorId = v.vendorId
            if (vendorId == updateOrder.vendorId){
                return v
            }
            })[0]
            const matchDetails = orderDetails.filter(d => {
            const orderId = d.orderId
            if (orderId == updateOrder.orderId){
                return d
            }
            })
            console.log("match details:", matchDetails)
            setnOVendor(matchVendor)
            setDetails(matchDetails)
            // setSubTotal(updateOrder.subTotal)
            setShippingCost(updateOrder.shippingCost)
            setTaxPct(updateOrder.taxPct)
            // setTaxAmt(updateOrder.taxAmt)
            // setTotalDue(updateOrder.totalDue)
        } else {
            console.log("Selecting null")
            setnOVendor({})
            setDetails([])
            setSubTotal(0)
            setShippingCost(0)
            setTaxPct(0)
            setTaxAmt(0)
            setTotalDue(0)
        }
    }

    useEffect(() => {

        console.log("selected order:", updateOrder)
        autofill()
    }, [updateOrder])


    const addMore = () => {

        setDetails(d => ([...d, 0]))
    }

    useEffect(() => {

        let sum = 0.0
        for (const d of details) {
            console.log(d)
            if (d.lineTotal >= 0) sum += d.lineTotal
        }

        setSubTotal(sum)

    }, [details])

    useEffect(() => {

        setTotalDue(subTotal + shippingCost + taxAmt)

    }, [subTotal, shippingCost, taxAmt])

    useEffect(() => {

        const taxedAmount = subTotal * taxPct
        setTaxAmt(taxedAmount)

    }, [taxPct])

    return (
        <>
            <h2>Update an Order and its related Order Details (USE WITH CAUTION)</h2>

            <form className="cuForm" onSubmit={e => {e.preventDefault(); console.log(e)}}>

                <label htmlFor="updateOrderById">Select Order</label>
                <select name="updateOrderById" id="updateOrderById" value={JSON.stringify(updateOrder)} onChange={e => {setUpdateOrder(JSON.parse(e.target.value))}}>
                    <option selected value={updateOrder}>Select an Order</option>
                    {orders.map((order) => (
                        <option key={order.orderId} value={JSON.stringify(order)}>
                            {order.orderId}
                        </option>
                    ))}
                </select>
                <label htmlFor="assingVendorId">Vendor: </label>
                <select name="assingVendorId" id="assingVendorId" required onChange={e => {setnOVendor(e.target.value)}}>
                    <option disabled selected hidden value={null}>-- Please choose a vendor --</option>
                    {vendors.map((vendor) => (
                        <option key={vendor.vendorId} value={vendor.vendorId}>
                            {vendor.vendorId} - {vendor.vendorName}
                        </option>
                    ))}
                </select>

                <button
                    name="addMore"
                    id="addMore"
                    onClick={addMore}
                >Add Order Detail</button>

                <div id="orderDetails">
                    {details.map((detail, i) => {
                        console.log("Detail at index ", i, ":", detail);
                        return (
                        <CreateOrderDetailForm key={i} index={i} setDetails={setDetails} candies={candies} existingOrderDetail={detail}></CreateOrderDetailForm>
                        )
                    })}
                </div>

                <div></div> {/*for temporary spacing*/}
                <label htmlFor="inputTaxPct">Tax Percent: </label>
                <input
                    type="number"
                    step="0.01" //allows decimals? !
                    name="inputTaxPct"
                    id="inputTaxPct"
                    min={0}
                    value={taxPct}
                    onChange={e => {setTaxPct(e.target.value)}}
                />
                
                <label htmlFor="subTotal">Subtotal: </label>
                <input
                    type="number"
                    name="subTotal"
                    id="subTotal"
                    value={subTotal}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="taxAmtOfTotal">Tax Amount: </label>
                <input
                    type="number"
                    name="taxAmtOfTotal"
                    id="taxAmtOfTotal"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="shippingCost">Shipping Cost: </label>
                <input
                    type="number"
                    name="shippingCost"
                    id="shippingCost"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="orderDate">Order Date: </label>
                <input
                    type="datetime-local"
                    name="orderDate"
                    id="orderDate"
                    value={currentDate}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="totalDue">Total Due: </label>
                <input
                    type="number"
                    name="totalDue"
                    id="totalDue"
                    value={totalDue}
                    readOnly
                    className="read-only-input"
                />

                <input type="submit" value="Submit Order" />
            </form>
        </>
    );
};

export default UpdateOrderForm;