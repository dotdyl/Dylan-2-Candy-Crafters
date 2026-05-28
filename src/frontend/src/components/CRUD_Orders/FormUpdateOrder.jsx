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
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md mb-6 mt-6">
            <div className="card-body p-4">
                <div className="flex-shrink-0 lg:mb-3">
                    <h2 className="text-lg font-bold text-base-content">Update an Order and its related Order Details (USE WITH CAUTION)</h2>
                </div>

                <form className="flex flex-wrap items-end gap-6" onSubmit={e => {e.preventDefault(); console.log(e)}}>

                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateOrderById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Select Order</span>
                        </label>
                        <select name="updateOrderById" id="updateOrderById" className="select select-bordered select-primary select-sm w-full" value={JSON.stringify(updateOrder)} onChange={e => {setUpdateOrder(JSON.parse(e.target.value))}}>
                            <option selected value={updateOrder}>Select an Order</option>
                            {orders.map((order) => (
                                <option key={order.orderId} value={JSON.stringify(order)}>
                                    {order.orderId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="assingVendorId" className="label py-1">
                            <span className="label-text font-semibold text-xs">Vendor</span>
                        </label>
                        <select name="assingVendorId" id="assingVendorId" required className="select select-bordered select-primary select-sm w-full" onChange={e => {setnOVendor(e.target.value)}}>
                            <option disabled selected hidden value={null}>-- Please choose a vendor --</option>
                            {vendors.map((vendor) => (
                                <option key={vendor.vendorId} value={vendor.vendorId}>
                                    {vendor.vendorId} - {vendor.vendorName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-shrink-0 lg:mb-0.5">
                        <button
                            type="button"
                            name="addMore"
                            id="addMore"
                            className="btn btn-secondary btn-sm px-6 w-full lg:w-auto"
                            onClick={addMore}
                        >Add Order Detail</button>
                    </div>

                    <div id="orderDetails" className="w-full flex flex-col gap-4">
                        {details.map((detail, i) => {
                            console.log("Detail at index ", i, ":", detail);
                            return (
                            <CreateOrderDetailForm key={i} index={i} setDetails={setDetails} candies={candies} existingOrderDetail={detail}></CreateOrderDetailForm>
                            )
                        })}
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="inputTaxPct" className="label py-1">
                            <span className="label-text font-semibold text-xs">Tax Percent</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="inputTaxPct"
                            id="inputTaxPct"
                            min={0}
                            value={taxPct}
                            onChange={e => {setTaxPct(e.target.value)}}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    
                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="subTotal" className="label py-1">
                            <span className="label-text font-semibold text-xs">Subtotal</span>
                        </label>
                        <input
                            type="number"
                            name="subTotal"
                            id="subTotal"
                            value={subTotal}
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                        />
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="taxAmtOfTotal" className="label py-1">
                            <span className="label-text font-semibold text-xs">Tax Amount</span>
                        </label>
                        <input
                            type="number"
                            name="taxAmtOfTotal"
                            id="taxAmtOfTotal"
                            value={placeholderValue}
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                        />
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="shippingCost" className="label py-1">
                            <span className="label-text font-semibold text-xs">Shipping Cost</span>
                        </label>
                        <input
                            type="number"
                            name="shippingCost"
                            id="shippingCost"
                            value={placeholderValue}
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                        />
                    </div>

                    <div className="form-control w-full max-w-[180px]">
                        <label htmlFor="orderDate" className="label py-1">
                            <span className="label-text font-semibold text-xs">Order Date</span>
                        </label>
                        <input
                            type="datetime-local"
                            name="orderDate"
                            id="orderDate"
                            value={currentDate}
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                        />
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="totalDue" className="label py-1">
                            <span className="label-text font-semibold text-xs">Total Due</span>
                        </label>
                        <input
                            type="number"
                            name="totalDue"
                            id="totalDue"
                            value={totalDue}
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex-shrink-0 lg:mb-0.5 w-full mt-4">
                        <input type="submit" value="Submit Order" className="btn btn-primary btn-sm px-6 w-full lg:w-auto" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrderForm;