// Citation for the following module:
// Date: 06/08/2026
// Based on: Structure of PUT requests calling in "submitData()" etc., OSU CS340 Pages
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188 

import { useEffect, useState } from "react";

const blankOrderDetail = {
    "orderId": -1,
    "candyId": -1,
    "orderWeightLbs": 0.0,
    "unitPricePerLb": 0.0,
    "lineTotal": 0.0
}

const UpdateOrderDetailsForm = ({ backendURL, candies, orderDetails, orders, getData }) => {

    const [updateOrderDetail, setUpdatedOrderDetail] = useState({blankOrderDetail})

    const [icandy, setiCandy] = useState({})
    const [upp, setUpp] = useState(0.0)
    const [owp, setOwp] = useState(0.0)
    const [lt, setLt] = useState(0.0)
    const [order, setOrder] = useState({})

    const submitUpdate = async () => {
        try {
            const body = {
                    "orderDetailsId": updateOrderDetail.orderDetailsId, 
                    "orderId": order.orderId,
                    "candyId": icandy.candyId,
                    "unitPricePerLb": upp,
                    "orderWeightLbs": owp,
                    "lineTotal": lt
                }
            const response = await fetch( backendURL + "/orderDetails", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            if (response.status == 200) {
                getData()
            } else {
                const text = await response.json()
                alert(text)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const autofill = () => {
        
        if (Object.keys(updateOrderDetail).length !== 0){
            const matchCandy = candies.filter(c => {
            const candyId = c.candyId
            if (candyId == updateOrderDetail.candyId){
                return c
            }
            })[0]
            const matchOrder = orders.filter(c => {
            const orderId = c.orderId
            if (orderId == updateOrderDetail.orderId){
                return c
            }
            })[0]
            setiCandy(matchCandy)
            setOrder(matchOrder)
            setUpp(updateOrderDetail.unitPricePerLb)
            setOwp(updateOrderDetail.orderWeightLbs)
            setLt(updateOrderDetail.lineTotal)
        } else {
            console.log("Selecting null")
            setiCandy({})
            setOrder({})
            setUpp(0)
            setOwp(0)
            setLt(0)
        }
    }

    useEffect(() => {

        autofill()
    }, [updateOrderDetail])

    useEffect(() => {
        if (icandy != undefined) {
            setUpp(icandy.pricePerLb);
            setLt(owp * icandy.pricePerLb)
        }
    }, [icandy])

    return (
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md mb-6 mt-6">
            <div className="card-body p-4">
                <div className="flex-shrink-0 lg:mb-3">
                    <h2 className="text-lg font-bold text-base-content">Update an Order Detail (USE WITH CAUTION)</h2>
                </div>
                <form className="flex flex-wrap items-end gap-6" onSubmit={e => {e.preventDefault()}}>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateOrderDetailById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Order Detail to Update</span>
                        </label>
                        <select name="updateOrderDetailById" id="updateOrderDetailById" className="select select-bordered select-primary select-sm w-full" defaultValue="" onChange={e => {console.log(e.target.value); setUpdatedOrderDetail(JSON.parse(e.target.value))}}>
                            <option  disabled hidden value="">Select an Order Detail</option>
                            {orderDetails.map((detail) => (
                                <option key={detail.orderDetailsId} value={JSON.stringify(detail)}>
                                    {detail.orderDetailsId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateOrderById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Change Order (NOT RECOMMENDED)</span>
                        </label>
                        <select name="updateOrderById" id="updateOrderById" className="select select-bordered select-primary select-sm w-full" value={JSON.stringify(order)} onChange={e => {setOrder(JSON.parse(e.target.value))}}>
                            <option value={JSON.stringify(null)}>Select an Order</option>
                            {orders.map((order) => (
                                <option key={order.orderId} value={JSON.stringify(order)}>
                                    {order.orderId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateCandyById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Change Candy</span>
                        </label>
                        <select name="updateCandyById" id="updateCandyById" className="select select-bordered select-primary select-sm w-full" value={JSON.stringify(icandy)} onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                            <option value={JSON.stringify(null)}>Select a Candy</option>
                            {candies.map((candy) => (
                                <option key={candy.candyId} value={JSON.stringify(candy)}>
                                    {candy.candyId} - {candy.candyName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="inputOrderWeight" className="label py-1">
                            <span className="label-text font-semibold text-xs">Order Weight LBS</span>
                        </label>
                        <input
                            type="number"
                            step="0.01" //allows decimals? !
                            name="inputOrderWeight"
                            id="inputOrderWeight"
                            min={0}
                            value={owp}
                            onChange={e => {setOwp(e.target.value); setLt(e.target.value * upp)}}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    {/*read only fields, use a special 'greyed' out class*/}
                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="unitPricePerLb" className="label py-1">
                            <span className="label-text font-semibold text-xs">Unit Price Per LB</span>
                        </label>
                        <input
                            type="number"
                            name="unitPricePerLb"
                            id="unitPricePerLb"
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                            value={upp ?? 0}
                            onChange={e => {setUpp(e.target.value)}}
                        />
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="lineTotal" className="label py-1">
                            <span className="label-text font-semibold text-xs">Line Total</span>
                        </label>
                        <input
                            type="number"
                            name="lineTotal"
                            id="lineTotal"
                            readOnly
                            className="input input-bordered input-sm w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                            value={lt ?? 0}
                        />
                    </div>

                    <div className="flex-shrink-0 lg:mb-0.5">
                        <button type="submit" className="btn btn-primary btn-sm px-6 w-full lg:w-auto" onClick={e => {submitUpdate()}}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}; export default UpdateOrderDetailsForm;