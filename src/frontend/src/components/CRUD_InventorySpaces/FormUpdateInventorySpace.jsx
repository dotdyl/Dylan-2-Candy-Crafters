import { useEffect, useState } from "react";

const UpdateInventorySpaceForm = ({ backendURL, candies, inventorySpaces }) => {

    const [updateInventory, setUpdatedInventory] = useState({})
    const [icandy, setiCandy] = useState({})
    const [lastStocked, setLastStocked] = useState()
    const [gallonsFilled, setGallonsFilled] = useState(0.0)

    const autofill = () => {
        
        if (Object.keys(updateInventory).length !== 0){
            const matchCandy = candies.filter(c => {
            const candyID = c.candyID
            if (candyID == updateInventory.candyID){
                return c
            }
            })[0]
            if (updateInventory.lastStocked !== null){
                const formattedDate = updateInventory.lastStocked.split('T')[0]
                setLastStocked(formattedDate)
            } else {
                setLastStocked(new Date(undefined))
            }
            setiCandy(matchCandy)
            setGallonsFilled(updateInventory.gallonsFilled)
        }
    }

    useEffect(() => {

        autofill()
    }, [updateInventory])

    return (
        <>
            <h2>Update a Inventory Space</h2>
            <form className="cuForm" onSubmit={e => {e.preventDefault()}}>
                <label htmlFor="updateInventoryByID">Inventory Space to Update: </label>
                <select name="updateInventoryByID" id="updateInventoryByID" onChange={e => {setUpdatedInventory(JSON.parse(e.target.value))}}>
                    <option selected value={null}>Select an Inventory Space</option>
                    {inventorySpaces.map((space) => (
                        <option key={space.inventoryID} value={JSON.stringify(space)}>
                            {space.inventoryID}
                        </option>
                    ))}
                </select>
                <label htmlFor="updateCandyByID">Candy to Update: </label>
                <select name="updateCandyByID" id="updateCandyByID" value={JSON.stringify(icandy)} onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                    <option selected value={icandy}>-- Optionally choose a candy --</option>
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
                    value={gallonsFilled}
                />
                <label htmlFor="createLastStocked">Last Stocked: </label>
                <input
                    type="date"
                    name="createLastStocked"
                    id="createLastStocked"
                    value={lastStocked}
                />
                <button type="submit">Update</button>
            </form>
        </>
    );
}; export default UpdateInventorySpaceForm;