const UpdateCandyForm = ({ candies, backendURL, refreshCandy }) => {

    return (
        <>
            <h2>Update a Candy</h2>
            <form className='cuForm'>
                <label htmlFor="updateCandyByID">Candy to Update: </label>
                <select
                    name="updateCandyByID"
                    id="updateCandyByID"
                >
                    <option value="">Select a Candy</option>
                    {candies.map((candy) => (
                        <option key={candy.id} value={candy.id}>
                            {candy.candyID} - {candy.candyName}
                        </option>
                    ))}
                </select>
                <label htmlFor="updateCandyName">Candy Name: </label>
                <input
                    type="text"
                    name="updateCandyName"
                    id="updateCandyName"
                />
                <label htmlFor="updateCandyPricePerLB">Candy Price Per LB: </label>
                <input
                    type="number"
                    name="updateCandyPricePerLB"
                    id="updateCandyPricePerLB"
                />
                <label htmlFor="updateCandylbsPerGallon">Candy LBS Per Gallon: </label>
                <input
                    type="number"
                    name="updateCandylbsPerGallon"
                    id="updateCandylbsPerGallon"
                />
                <label htmlFor="viewGallonsOnHand">Gallons on Hand: </label>
                <input
                    type="number"
                    name="updateCandyPricePerLB"
                    id="updateCandyPricePerLB"
                    readOnly
                    className="read-only-input"
                />

            </form>
        </>
    );
}; export default UpdateCandyForm;