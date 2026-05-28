import { useState } from "react";

const CreateInventorySpaceForm = ({ backendURL, candies }) => {

    const [icandy, setiCandy] = useState({})

    return (
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md">
            <div className="card-body p-4">
                <div className="flex-shrink-0 lg:mb-3">
                    <h2 className="text-lg font-bold text-base-content">Create an Inventory Space</h2>
                </div>

                <form className="flex flex-wrap items-end gap-6" onSubmit={e => {e.preventDefault()}}>
                    <div className="form-control w-full max-w-[200px]">
                        <label htmlFor="createInventoryId" className="label py-1">
                            <span className="label-text font-semibold text-xs">Inventory Id (Unique)</span>
                        </label>
                        <input
                            type="number"
                            name="createInventoryId"
                            id="createInventoryId"
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="assingCandyId" className="label py-1">
                            <span className="label-text font-semibold text-xs">Candy</span>
                        </label>
                        <select name="assingCandyId" id="assingCandyId" className="select select-bordered select-primary select-sm w-full" defaultValue="" onChange={e => {setiCandy(JSON.parse(e.target.value))}}>
                            <option value="">-- Optionally choose a candy --</option>
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
                            defaultValue={0}
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
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="flex-shrink-0 lg:mb-0.5">
                        <button type="submit" className="btn btn-primary btn-sm px-6 w-full lg:w-auto">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInventorySpaceForm;
