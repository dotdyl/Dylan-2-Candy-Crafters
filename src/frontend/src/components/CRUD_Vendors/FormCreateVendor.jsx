const CreateVendorForm = ({ backendURL }) => {

    return (
        <>
            <h2>Create a Vendor</h2>

            <form className="cuForm" onSubmit={e => {e.preventDefault()}}>
                <label htmlFor="createVendorName">Vendor Name: </label>
                <input
                    type="text"
                    name="createVendorName"
                    id="createVendorName"
                />
                <label htmlFor="createVendorAddressLine1">Address Line 1: </label>
                <input
                    type="text"
                    name="createVendorAddressLine1"
                    id="createVendorAddressLine1"
                />
                <label htmlFor="createVendorAddressLine2">Address Line 2: </label>
                <input
                    type="text"
                    name="createVendorAddressLine2"
                    id="createVendorAddressLine2"
                />
                <label htmlFor="createVendorCity">City: </label>
                <input
                    type="text"
                    name="createVendorCity"
                    id="createVendorCity"
                />
                <label htmlFor="createVendorState">State: </label>
                <input
                    type="text"
                    name="createVendorState"
                    id="createVendorState"
                />
                <label htmlFor="createVendorPostalCode">Postal Code: </label>
                <input
                    type="text"
                    name="createVendorPostalCode"
                    id="createVendorPostalCode"
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
};

export default CreateVendorForm;
