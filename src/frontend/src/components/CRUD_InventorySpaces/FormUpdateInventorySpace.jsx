import { useEffect, useState } from "react";

const UpdateInventorySpaceForm = ({ backendURL, candies, inventorySpaces, getData }) => {

    const [updateInventory, setUpdatedInventory] = useState({})
    const [icandy, setiCandy] = useState({})
    const [lastStocked, setLastStocked] = useState()
    const [gallonsFilled, setGallonsFilled] = useState(0.0)

    const submitUpdate = async () => {
        try {
            console.log("bleh")
            const body = {
                    "inventoryId": updateInventory.inventoryId,
                    "candyId": icandy.candyId,
                    "gallonsFilled": gallonsFilled,
                    "lastStocked": lastStocked
                }
            console.log(body)
            const response = await fetch(backendURL + "/inventory", {
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

        if (Object.keys(updateInventory).length !== 0){
            const matchCandy = candies.filter(c => {
            const candyId = c.candyId
            if (candyId == updateInventory.candyId){
                return c
            }
            })[0]
            if (updateInventory.lastStocked !== null){
                const formattedDate = updateInventory.lastStocked.split('T')[0]
                setLastStocked(formattedDate)
            } else {
                setLastStocked(new Date(undefined))
            }
            if (matchCandy){
              setiCandy(matchCandy)
            } else {
              setiCandy(null);
            }
            setGallonsFilled(updateInventory.gallonsFilled)
        }
    }

    useEffect(() => {

        autofill()
    }, [updateInventory])

    return (
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md">
            <div className="card-body p-4">
                <div className="flex-shrink-0 lg:mb-3">
                    <h2 className="text-lg font-bold text-base-content">Update an Inventory Space</h2>
                </div>

                <form className="flex flex-wrap items-end gap-6" onSubmit={e => {e.preventDefault()}}>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateInventoryById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Inventory Space to Update</span>
                        </label>
                        <select name="updateInventoryById" id="updateInventoryById" className="select select-bordered select-primary select-sm w-full" defaultValue="" onChange={e => {setUpdatedInventory(JSON.parse(e.target.value))}}>
                            <option value="" disabled hidden>Select an Inventory Space</option>
                            {inventorySpaces.map((space) => (
                                <option key={space.inventoryId} value={JSON.stringify(space)}>
                                    {space.inventoryId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateCandyById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Candy to Update</span>
                        </label>
                        <select name="updateCandyById" id="updateCandyById" className="select select-bordered select-primary select-sm w-full" value={JSON.stringify(icandy)} onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                            <option value={JSON.stringify(null)}>-- Optionally choose a candy --</option>
                            {candies.map((candy) => (
                                <option key={candy.candyId} value={JSON.stringify(candy)}>
                                    {candy.candyId} - {candy.candyName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="createGallonsFilled" className="label py-1">
                            <span className="label-text font-semibold text-xs">Gallons Filled</span>
                        </label>
                        <input
                            type="number"
                            name="createGallonsFilled"
                            id="createGallonsFilled"
                            value={gallonsFilled || ''}
                            onChange={(e) => setGallonsFilled(parseFloat(e.target.value))}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="form-control w-full max-w-[180px]">
                        <label htmlFor="createLastStocked" className="label py-1">
                            <span className="label-text font-semibold text-xs">Last Stocked</span>
                        </label>
                        <input
                            type="date"
                            name="createLastStocked"
                            id="createLastStocked"
                            value={lastStocked || ''}
                            onChange={(e) => setLastStocked(e.target.value)}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="flex-shrink-0 lg:mb-0.5">
                        <button type="submit" className="btn btn-primary btn-sm px-6 w-full lg:w-auto" onClick={e => {submitUpdate()}}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}; export default UpdateInventorySpaceForm;
