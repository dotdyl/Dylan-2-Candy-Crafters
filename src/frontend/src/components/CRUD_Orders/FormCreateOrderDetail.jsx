import { useState, useEffect } from "react";
import DeleteButton from "../ButtonDelete";

const blankOrderDetail = {
    "orderId": -1,
    "candyId": -1,
    "orderWeightLbs": 0.0,
    "unitPricePerLb": 0.0,
    "lineTotal": 0.0
}

export default function CreateOrderDetailForm({candies, index, setDetails, orders, existingOrderDetail}) {

    const placeholderValue = 0;
    const [order, setOrder] = useState({})
    const [candy, setCandy] = useState({})
    const [upp, setUpp] = useState(0.0)
    const [owp, setOwp] = useState(0.0)
    const [lt, setLt] = useState(0.0)
    const [orderDetail, setOrderDetail] = useState({blankOrderDetail})

    const autofill = () => {
        if (existingOrderDetail == undefined || existingOrderDetail == blankOrderDetail){
            console.log("Candy: ", candy)
            setUpp(candy.pricePerLb)
            const newLt = candy.pricePerLb * owp
            setLt(candy.pricePerLb * owp)

            const newOrderDetail = {
                "orderId": -1,
                "candyId": candy.candyId,
                "orderWeightLbs": owp,
                "unitPricePerLb": upp,
                "lineTotal": lt
            }

            setOrderDetail(newOrderDetail)

            addToTotal(newOrderDetail)
        }
    }

    const setExisting = (existing) => {
        console.log("existing order detail: ", existing)
        setOwp(existing.orderWeightLbs)
        setUpp(existing.unitPricePerLb)
        setLt(existing.lineTotal)
        setOrderDetail(existing)
        setCandy(existing.candyId)
        addToTotal(existing)
    }

    const addToTotal = (nd) => {
        if (setDetails) setDetails(d => 
            d.map((item, i) => (i === index ? nd : item))
        );
    }

    const onDelete = () => {
        if (setDetails) setDetails(d => d.filter((d, i) => (i !== index)))
    }

    const handleCandyAdd = (value) => {

        setCandy(value)
    }

    useEffect(() => {

        autofill()
    }, [candy])

    useEffect(() => {
        console.log("existing?: ", existingOrderDetail)
        if (existingOrderDetail != undefined && existingOrderDetail != blankOrderDetail){

            if (existingOrderDetail.candyId != undefined) setExisting(existingOrderDetail)
        } else {
            autofill()
        }
    }, [])

    
    return (
        <fieldset className="candyFields">
            
            {orders && 
                    <>
                    <label htmlFor="updateOrderById">Select Order: </label>
                    <select name="updateOrderById" id="updateOrderById" value={JSON.stringify(order)} onChange={e => {setOrder(JSON.parse(e.target.value))}}>
                        <option selected value={order}>Select an Order</option>
                        {orders.map((order) => (
                            <option key={order.orderId} value={JSON.stringify(order)}>
                                {order.orderId}
                            </option>
                        ))}
                    </select>
                    </>
            }

            <label htmlFor="assignCandyId">Assign Candy: </label>
            <select name="assignCandyId" id="assignCandyId" required onChange={e => {console.log("Setting candy id in detail"); handleCandyAdd(JSON.parse(e.target.value))}}>
                <option disabled selected hidden value={null}>-- Please choose a candy --</option>
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
                onChange={e => {setOwp(e.target.value); setLt(e.target.value * upp); autofill()}}
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
                onChange={e => {setUpp(e.target.value); autofill()}}
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

            {!orders &&
                <DeleteButton onDelete={onDelete} ></DeleteButton>
            }

            {orders &&
                <button type="submit" value="Submit Order">Add</button>
            }
            
        </fieldset>
    )
}