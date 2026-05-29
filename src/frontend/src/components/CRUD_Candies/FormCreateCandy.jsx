// Citation for the following module:
// Date: 05/28/2026
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209

const CreateCandyForm = ({ backendURL, refreshPeople }) => {
    return (
        // max-w-5xl gives it a wider container to fit all inputs smoothly in a line
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md">
            <div className="card-body p-4">
                  
                {/*Main Heading - just standalone*/}
                <div className="lg:mb-3 flex-shrink-0">
                    <h2 className="text-lg font-bold text-base-content">
                    Create Candy
                    </h2>
                </div>


                <form className="flex flex-wrap items-end gap-6">  
                    {/* Main Column: The 3 Fields aligned side-by-side */}
                        
                        {/* 1. Candy Name Input */}
                        <div className="form-control w-full max-w-[250px]">
                            <label htmlFor="createCandy" className="label py-1">
                                <span className="label-text font-semibold text-xs">Candy Name</span>
                            </label>
                            <input
                                type="text"
                                name="createCandy"
                                id="createCandy"
                                placeholder="e.g., Peppermint Swirl"
                                className="input input-bordered input-primary input-sm w-full"
                            />
                        </div>

                        {/* 2. Candy Price Input */}
                        <div className="form-control max-w-[180px]">
                            <label htmlFor="createCandyPricePerLB" className="label py-1">
                                <span className="label-text font-semibold text-xs">Price Per LB</span>
                            </label>
                            <input
                                type="number"
                                name="createCandyPricePerLB"
                                id="createCandyPricePerLB"
                                placeholder="0.00"
                                step="0.01"
                                className="input input-bordered input-primary input-sm w-full"
                            />
                        </div>

                        {/* 3. Lbs Per Gallon Input */}
                        <div className="form-control w-full max-w-[180px]">
                            <label htmlFor="createLbsPerGallon" className="label py-1">
                                <span className="label-text font-semibold text-xs">Lbs Per Gallon</span>
                            </label>
                            <input
                                type="number"
                                name="createLbsPerGallon"
                                id="createLbsPerGallon"
                                placeholder="0"
                                className="input input-bordered input-primary input-sm w-full"
                            />
                        </div>

                        {/* Right Column: Submit Button row-aligned */}
                        <div className="flex-shrink-0 lg:mb-0.5">
                            <button type="submit" className="btn btn-primary btn-sm px-6 w-full lg:w-auto">
                                Add Candy
                            </button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCandyForm;