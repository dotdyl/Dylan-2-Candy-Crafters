const CreateOrderForm = ({ backendURL, refreshPeople }) => {
    // Placeholder values for the read-only fields
    // In a real app, these would be variables or state like {calculatedSubtotal}
    const placeholderValue = 0;
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    return (
        <>
            <h2>Create an Order</h2>

            <form className="cuForm">
                <label htmlFor="createVendorID">Vendor ID: </label>
                <input
                    type="text"
                    name="createVendorID"
                    id="createVendorID"
                />

                <label htmlFor="assignCandyID">Assign Candy: </label>
                <select name="assignCandyID" id="assignCandyID">
                    <option value="">-- Please choose a candy --</option>

                    {/*todo: map candies after firing SELECT *...

                        candies.map(candy => (
                            <option key={candy.id} value={candy.id}>{candy.name}</option>
                        ))
                        */}

                    {/*hardcoded placeholders*/}
                    <option value="1">Gummy Bears</option>
                    <option value="2">Chocolate Bars</option>
                    <option value="3">Sour Worms</option>
                </select>

                <label htmlFor="inputOrderWeight">Order Weight LBS: </label>
                <input
                    type="number"
                    step="0.01" //allows decimals? !
                    name="inputOrderWeight"
                    id="inputOrderWeight"
                />


                {/*read only fields, use a special 'greyed' out class*/}
                <label htmlFor="unitPricePerLb">Unit Price Per LB: </label>
                <input
                    type="number"
                    name="unitPricePerLb"
                    id="unitPricePerLb"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="lineTotal">Line Total: </label>
                <input
                    type="number"
                    name="lineTotal"
                    id="lineTotal"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="subTotal">Subtotal: </label>
                <input
                    type="number"
                    name="subTotal"
                    id="subTotal"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="taxAmtOfTotal">Tax Amount: </label>
                <input
                    type="number"
                    name="taxAmtOfTotal"
                    id="taxAmtOfTotal"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="shippingCost">Shipping Cost: </label>
                <input
                    type="number"
                    name="shippingCost"
                    id="shippingCost"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="orderDate">Order Date: </label>
                <input
                    type="date"
                    name="orderDate"
                    id="orderDate"
                    value={currentDate}
                    readOnly
                    className="read-only-input"
                />

                <label htmlFor="totalDue">Total Due: </label>
                <input
                    type="number"
                    name="totalDue"
                    id="totalDue"
                    value={placeholderValue}
                    readOnly
                    className="read-only-input"
                />

                <input type="submit" value="Submit Order" />
            </form>
        </>
    );
};

export default CreateOrderForm;