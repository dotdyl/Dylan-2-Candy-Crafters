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
        <fieldset className="flex flex-wrap items-end gap-6 p-4 border border-base-300 rounded-md bg-base-50">
            
            {orders && 
                <div className="form-control w-full max-w-[250px]">
                    <label htmlFor="updateOrderById" className="label py-1">
                        <span className="label-text font-semibold text-xs">Select Order</span>
                    </label>
                    <select name="updateOrderById" id="updateOrderById" className="select select-bordered select-primary select-sm w-full" value={JSON.stringify(order)} onChange={e => {setOrder(JSON.parse(e.target.value))}}>
                        <option selected value={order}>Select an Order</option>
                        {orders.map((order) => (
                            <option key={order.orderId} value={JSON.stringify(order)}>
                                {order.orderId}
                            </option>
                        ))}
                    </select>
                </div>
            }

            <div className="form-control w-full max-w-[250px]">
                <label htmlFor="assignCandyId" className="label py-1">
                    <span className="label-text font-semibold text-xs">Assign Candy</span>
                </label>
                <select name="assignCandyId" id="assignCandyId" required className="select select-bordered select-primary select-sm w-full" onChange={e => {console.log("Setting candy id in detail"); handleCandyAdd(JSON.parse(e.target.value))}}>
                    <option disabled selected hidden value={null}>-- Please choose a candy --</option>
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
                    onChange={e => {setOwp(e.target.value); setLt(e.target.value * upp); autofill()}}
                    className="input input-bordered input-primary input-sm w-full"
                />
            </div>

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
                    value={upp}
                    onChange={e => {setUpp(e.target.value); autofill()}}
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
                    value={lt}
                />
            </div>

            <div className="flex-shrink-0 lg:mb-0.5">
                {!orders &&
                    <DeleteButton onDelete={onDelete} ></DeleteButton>
                }

                {orders &&
                    <button type="submit" value="Submit Order" className="btn btn-primary btn-sm px-6 w-full lg:w-auto">Add</button>
                }
            </div>
        </fieldset>
    )
}