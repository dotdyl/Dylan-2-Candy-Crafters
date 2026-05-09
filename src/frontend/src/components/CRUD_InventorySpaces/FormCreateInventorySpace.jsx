import { useState } from "react";

const CreateInventorySpaceForm = ({ backendURL, candies }) => {

    const [icandy, setiCandy] = useState({})

    return (
        <>
            <h2>Create a Inventory Space</h2>

            <form className="cuForm" onSubmit={e => {e.preventDefault()}}>
                <label htmlFor="createInventoryId">Inventory Id (Unique): </label>
                <input
                    type="number"
                    name="createInventoryId"
                    id="createInventoryId"
                />
                <label htmlFor="assingCandyId">Candy: </label>
                <select name="assingCandyId" id="assingCandyId" onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                    <option selected value={null}>-- Optionally choose a candy --</option>
                    {candies.map((candy) => (
                        <option key={candy.candyId} value={JSON.stringify(candy)}>
                            {candy.candyId} - {candy.candyName}
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
