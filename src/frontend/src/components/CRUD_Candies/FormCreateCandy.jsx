const CreateCandyForm = ({ backendURL, refreshPeople }) => {
    //no real major logic for this component, just jsx below
    return (
        <>
            <h2>Create a Candy</h2>

            <form className="cuForm">
                <label htmlFor="createCandy">Candy Name: </label>
                <input
                    type="text"
                    name="createCandy"
                    id="createCandy"
                />
                <label htmlFor="createCandyPricePerLB">Candy Price Per LB: </label>
                <input
                    type="number"
                    name="createCandyPricePerLB"
                    id="createCandyPricePerLB"
                />
                <label htmlFor="createLbsPerGallon">Lbs Per Gallon: </label>
                <input
                    type="number"
                    name="createLbsPerGallon"
                    id="createLbsPerGallon"
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
};

export default CreateCandyForm;
