import { useEffect, useState } from "react";

const UpdateCandyForm = ({ candies, backendURL, refreshCandy }) => {

    const [updateCandy, setUpdatedCandy] = useState({})
    const [candyName, setCandyName] = useState("")
    const [ppp, setPpp] = useState(0.0)
    const [ppg, setPpg] = useState(0.0)

    const autofill = () => {
        console.log(updateCandy)
        setCandyName(updateCandy.candyName)
        setPpp(updateCandy.pricePerLb)
        setPpg(updateCandy.lbsPerGallon)
    }

    useEffect(() => {

        autofill()
    }, [updateCandy])

    return (
        <>
            <h2>Update a Candy</h2>
            <form className='cuForm'>
                <label htmlFor="updateCandyByID">Candy to Update: </label>
                <select name="updateCandyByID" id="updateCandyByID" onChange={e => {setUpdatedCandy(JSON.parse(e.target.value))}}>
                    <option value="">Select a Candy</option>
                    {candies.map((candy) => (
                        <option key={candy.id} value={JSON.stringify(candy)}>
                            {candy.candyID} - {candy.candyName}
                        </option>
                    ))}
                </select>
                <label htmlFor="updateCandyName">Candy Name: </label>
                <input
                    type="text"
                    name="updateCandyName"
                    id="updateCandyName"
                    value={candyName}
                />
                <label htmlFor="updateCandyPricePerLB">Candy Price Per LB: </label>
                <input
                    type="number"
                    name="updateCandyPricePerLB"
                    id="updateCandyPricePerLB"
                    value={ppp}
                />
                <label htmlFor="updateCandylbsPerGallon">Candy LBS Per Gallon: </label>
                <input
                    type="number"
                    name="updateCandylbsPerGallon"
                    id="updateCandylbsPerGallon"
                    value={ppg}
                />
                <button type="submit">Update</button>
            </form>
        </>
    );
}; export default UpdateCandyForm;