import { useState, useEffect } from "react";
import DeleteButton from "../ButtonDelete";

const blankOrderDetail = {
    "orderId": -1,
    "candyId": -1,
    "orderWeightLbs": 0.0,
    "unitPricePerLb": 0.0,
    "lineTotal": 0.0
}

export default function CreateOrderDetailForm({candies, index, setDetails}) {

    const placeholderValue = 0;
    const [candy, setCandy] = useState({})
    const [upp, setUpp] = useState(0.0)
    const [owp, setOwp] = useState(0.0)
    const [lt, setLt] = useState(0.0)
    const [orderDetail, setOrderDetail] = useState({blankOrderDetail})

    const autofill = () => {
        console.log(candy)
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

    const addToTotal = (nd) => {
        setDetails(d => 
            d.map((item, i) => (i === index ? nd : item))
        );
    }

    const onDelete = () => {
        setDetails(d => d.filter((d, i) => (i !== index)))
    }

    useEffect(() => {

        autofill()
    }, [candy, upp, owp, lt])

    return (
        <fieldset className="candyFields">
            <label htmlFor="assignCandyId">Assign Candy: </label>
            <select name="assignCandyId" id="assignCandyId" required onChange={e => {setCandy(JSON.parse(e.target.value))}}>
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

            <DeleteButton onDelete={onDelete} ></DeleteButton>
        </fieldset>
    )
}