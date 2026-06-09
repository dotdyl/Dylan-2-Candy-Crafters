// Citation for the following module:
// Date: 05/28/2026
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209

import { useState } from "react";

const CreateCandyForm = ({ backendURL, refreshCandy }) => {

    //state vars
    const [candyName, setCandyName] = useState("")
    const [candyPricePerLb, setCandyPricePerLb] = useState(0.0)
    const [candyLbsPerGallon, setCandyLbsPerGallon] = useState(0.0)

    //func to submit the new candy when "Add" is clicked
    const submitCandy = async () => {
        try {
            const body = {
                    "candyName": candyName, 
                    "candyPricePerLb": candyPricePerLb,
                    "candyLbsPerGallon": candyLbsPerGallon
                }
            const response = await fetch(backendURL + "/candies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            if (response.status == 200) {
                refreshCandy()
            } else {
                const text = await response.json()
                alert(text)
            }
        } catch (error) {
            console.log(error)
        }
    }


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
                                onChange={event => setCandyName(event.target.value)} //set state 
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
                                onChange={event => setCandyPricePerLb(event.target.value)} //set state 
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
                                onChange={event => setCandyLbsPerGallon(event.target.value)} 
                            />
                        </div>

                        {/* Right Column: Submit Button row-aligned */}
                        <div className="flex-shrink-0 lg:mb-0.5">
                            <button type="submit" className="btn btn-primary btn-sm px-6 w-full lg:w-auto" onClick={event => {event.preventDefault(); submitCandy(); refreshCandy()}}>
                                Add Candy
                            </button>
                        </div>  
                </form>
            </div>
        </div>
    );
};

export default CreateCandyForm;