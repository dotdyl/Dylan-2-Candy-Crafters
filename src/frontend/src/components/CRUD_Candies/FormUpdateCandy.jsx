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
        {/*wrap whole Form in a "card" for styling*/}
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md">
            {/*wrap all body in card-body, auto does Flex etc*/}
            <div className="card-body p-4">
                <div className= "flex-shrink-0">
                    <h2 className="text-lg font-bold text-base-content">
                        Update a Candy
                    </h2>
                </div>

                <form className='flex flex-wrap items-end gap-6'>

                    <div className="form-control w-full max-w-[250px]">
                        <label className="label" htmlFor="updateCandyById">
                            <span className="label-text font-semibold">Candy to Update:</span>
                        </label>
                        <select className="select select-bordered select-primary select-sm w-full max-w-xs" defaultValue="-- Select a Candy --" name="updateCandyById" id="updateCandyById" onChange={e => {setUpdatedCandy(JSON.parse(e.target.value))}}>
                            <option disabled hidden value={null}>-- Select a Candy --</option>
                            {candies.map((candy) => (
                                <option key={candy.id} value={JSON.stringify(candy)}>
                                    {candy.candyId} - {candy.candyName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label className="label" htmlFor="updateCandyName">
                            <span className="label-text font-semibold">
                                Candy Name:
                            </span>
                        </label>
                        <input
                            type="text"
                            name="updateCandyName"
                            id="updateCandyName"
                            value={candyName}
                            onChange={e => setCandyName(e.target.value)}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="form-control w-full max-w-[200px]">
                        <label className="label" htmlFor="updateCandyPricePerLB">
                            <span className="label-text font-semibold">Candy Price Per LB:</span>
                        </label>
                        <input
                            type="number"
                            name="updateCandyPricePerLB"
                            id="updateCandyPricePerLB"
                            value={ppp}
                            onChange={e => setPpp(e.target.value)}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="form-control w-full max-w-[200px]">
                        <label className="label" htmlFor="updateCandylbsPerGallon">
                            <span className="label-text font-semibold">Candy LBS Per Gallon:</span>
                        </label>
                        <input
                            type="number"
                            name="updateCandylbsPerGallon"
                            id="updateCandylbsPerGallon"
                            value={ppg}
                            onChange={e => setPpg(e.target.value)}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>

                    <div className="flex flex-shrink-0">
                        <button className="btn btn-primary btn-sm px-6 w-full" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}; export default UpdateCandyForm;
