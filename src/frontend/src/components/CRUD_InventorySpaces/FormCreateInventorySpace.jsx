import { useState } from "react";

const CreateInventorySpaceForm = ({ backendURL, candies }) => {

    const [icandy, setiCandy] = useState({})

    return (
        <>
            <h2>Create a Inventory Space</h2>

            <form className="cuForm" onSubmit={e => {e.preventDefault()}}>
                <label htmlFor="createInventoryID">Inventory ID (Unique): </label>
                <input
                    type="number"
                    name="createInventoryID"
                    id="createInventoryID"
                />
                <label htmlFor="assingCandyID">Candy: </label>
                <select name="assingCandyID" id="assingCandyID" onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                    <option selected value={null}>-- Optionally choose a candy --</option>
                    {candies.map((candy) => (
                        <option key={candy.candyID} value={JSON.stringify(candy)}>
                            {candy.candyID} - {candy.candyName}
                        </option>
                    ))}
                </select>
                <label htmlFor="createGallonsFilled">Gallons Filled: </label>
                <input
                    type="number"
                    name="createGallonsFilled"
                    id="createGallonsFilled"
                    value={0}
                />
                <label htmlFor="createLastStocked">Last Stocked: </label>
                <input
                    type="date"
                    name="createLastStocked"
                    id="createLastStocked"
                    value={null}
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
};

export default CreateInventorySpaceForm;
