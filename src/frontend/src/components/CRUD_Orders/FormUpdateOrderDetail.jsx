import { useEffect, useState } from "react";

const blankOrderDetail = {
    "orderId": -1,
    "candyId": -1,
    "orderWeightLbs": 0.0,
    "unitPricePerLb": 0.0,
    "lineTotal": 0.0
}

const UpdateOrderDetailsForm = ({ backendURL, candies, orderDetails, orders }) => {

    const [updateOrderDetail, setUpdatedOrderDetail] = useState({blankOrderDetail})

    const [icandy, setiCandy] = useState({})
    const [upp, setUpp] = useState(0.0)
    const [owp, setOwp] = useState(0.0)
    const [lt, setLt] = useState(0.0)
    const [order, setOrder] = useState({})

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
        if (icandy != undefined) setUpp(icandy.pricePerLb)
    }, [icandy])

    return (
        <>
            <h2>Update a Order Detail (USE WITH CAUTION)</h2>
            <form className="cuForm" onSubmit={e => {e.preventDefault()}}>
                <label htmlFor="updateOrderDetailById">Order Detail to Update: </label>
                <select name="updateOrderDetailById" id="updateOrderDetailById" onChange={e => {console.log(e.target.value); setUpdatedOrderDetail(JSON.parse(e.target.value))}}>
                    <option selected disabled hidden value={null}>Select an Order Detail</option>
                    {orderDetails.map((detail) => (
                        <option key={detail.orderDetailsId} value={JSON.stringify(detail)}>
                            {detail.orderDetailsId}
                        </option>
                    ))}
                </select>
                <label htmlFor="updateOrderById">Change Order (NOT RECOMMENDED): </label>
                <select name="updateOrderById" id="updateOrderById" value={JSON.stringify(order)} onChange={e => {setOrder(JSON.parse(e.target.value))}}>
                    <option selected value={order}>Select an Order</option>
                    {orders.map((order) => (
                        <option key={order.orderId} value={JSON.stringify(order)}>
                            {order.orderId}
                        </option>
                    ))}
                </select>
                <label htmlFor="updateCandyById">Change Candy: </label>
                <select name="updateCandyById" id="updateCandyById" value={JSON.stringify(icandy)} onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                    <option selected value={icandy}>Select a Candy</option>
                    {candies.map((candy) => (
                        <option key={candy.candyId} value={JSON.stringify(candy)}>
                            {candy.candyId} - {candy.candyName}
                        </option>
                    ))}
                </select>
                <label htmlFor="inputOrderWeight">Order Weight LBS: </label>
                <input
                    type="number"
                    step="0.01" //allows decimals? !
                    name="inputOrderWeight"
                    id="inputOrderWeight"
                    min={0}
                    value={owp}
                    onChange={e => {setOwp(e.target.value); setLt(e.target.value * upp)}}
                />


                {/*read only fields, use a special 'greyed' out class*/}
                <label htmlFor="unitPricePerLb">Unit Price Per LB: </label>
                <input
                    type="number"
                    name="unitPricePerLb"
                    id="unitPricePerLb"
                    readOnly
                    className="read-only-input"
                    value={upp}
                    onChange={e => {setUpp(e.target.value)}}
                />

                <label htmlFor="lineTotal">Line Total: </label>
                <input
                    type="number"
                    name="lineTotal"
                    id="lineTotal"
                    readOnly
                    className="read-only-input"
                    value={lt}
                />
                <button type="submit">Update</button>
            </form>
        </>
    );
}; export default UpdateOrderDetailsForm;