import { useEffect, useState } from "react";

const UpdateVendorForm = ({ vendors, backendURL }) => {

    const [updateVendor, setUpdatedVendor] = useState({})
    const [vendorName, setVendorName] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")

    const autofill = () => {
        console.log(updateVendor)
        setVendorName(updateVendor.vendorName)
        setAddressLine1(updateVendor.addressLine1)
        setAddressLine2(updateVendor.addressLine2)
        setCity(updateVendor.city)
        setState(updateVendor.state)
        setPostalCode(updateVendor.postalCode)
    }

    useEffect(() => {

        autofill()
    }, [updateVendor])

    return (
        <>
            <h2>Update a Vendor</h2>
            <form className="cuForm" onSubmit={e => {e.preventDefault()}}>
                <label htmlFor="updateVendorById">Vendor to Update: </label>
                <select name="updateVendorById" id="updateVendorById" onChange={e => {setUpdatedVendor(JSON.parse(e.target.value))}}>
                    <option value="">Select a Vendor</option>
                    {vendors.map((vendor) => (
                        <option key={vendor.id} value={JSON.stringify(vendor)}>
                            {vendor.vendorId} - {vendor.vendorName}
                        </option>
                    ))}
                </select>
                <label htmlFor="createVendorName">Vendor Name: </label>
                <input
                    type="text"
                    name="createVendorName"
                    id="createVendorName"
                    value={vendorName}
                />
                <label htmlFor="createVendorAddressLine1">Address Line 1: </label>
                <input
                    type="text"
                    name="createVendorAddressLine1"
                    id="createVendorAddressLine1"
                    value={addressLine1}
                />
                <label htmlFor="createVendorAddressLine2">Address Line 2: </label>
                <input
                    type="text"
                    name="createVendorAddressLine2"
                    id="createVendorAddressLine2"
                    value={addressLine2 === null ? "" : addressLine2}
                />
                <label htmlFor="createVendorCity">City: </label>
                <input
                    type="text"
                    name="createVendorCity"
                    id="createVendorCity"
                    value={city}
                />
                <label htmlFor="createVendorState">State: </label>
                <input
                    type="text"
                    name="createVendorState"
                    id="createVendorState"
                    value={state}
                />
                <label htmlFor="createVendorPostalCode">Postal Code: </label>
                <input
                    type="text"
                    name="createVendorPostalCode"
                    id="createVendorPostalCode"
                    value={postalCode}
                />
                <button type="submit">Update</button>
            </form>
        </>
    );
}; export default UpdateVendorForm;