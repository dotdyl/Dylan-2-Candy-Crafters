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
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md mb-6 mt-6">
            <div className="card-body p-4">
                <div className="flex-shrink-0 lg:mb-3">
                    <h2 className="text-lg font-bold text-base-content">Update a Vendor</h2>
                </div>
                <form className="flex flex-wrap items-end gap-6" onSubmit={e => {e.preventDefault()}}>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="updateVendorById" className="label py-1">
                            <span className="label-text font-semibold text-xs">Vendor to Update</span>
                        </label>
                        <select name="updateVendorById" id="updateVendorById" className="select select-bordered select-primary select-sm w-full" onChange={e => {setUpdatedVendor(JSON.parse(e.target.value))}}>
                            <option value="">Select a Vendor</option>
                            {vendors.map((vendor) => (
                                <option key={vendor.id} value={JSON.stringify(vendor)}>
                                    {vendor.vendorId} - {vendor.vendorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="createVendorName" className="label py-1">
                            <span className="label-text font-semibold text-xs">Vendor Name</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorName"
                            id="createVendorName"
                            value={vendorName}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="createVendorAddressLine1" className="label py-1">
                            <span className="label-text font-semibold text-xs">Address Line 1</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorAddressLine1"
                            id="createVendorAddressLine1"
                            value={addressLine1}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="createVendorAddressLine2" className="label py-1">
                            <span className="label-text font-semibold text-xs">Address Line 2</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorAddressLine2"
                            id="createVendorAddressLine2"
                            value={addressLine2 === null ? "" : addressLine2}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="createVendorCity" className="label py-1">
                            <span className="label-text font-semibold text-xs">City</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorCity"
                            id="createVendorCity"
                            value={city}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    <div className="form-control w-full max-w-[100px]">
                        <label htmlFor="createVendorState" className="label py-1">
                            <span className="label-text font-semibold text-xs">State</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorState"
                            id="createVendorState"
                            value={state}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    <div className="form-control w-full max-w-[150px]">
                        <label htmlFor="createVendorPostalCode" className="label py-1">
                            <span className="label-text font-semibold text-xs">Postal Code</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorPostalCode"
                            id="createVendorPostalCode"
                            value={postalCode}
                            className="input input-bordered input-primary input-sm w-full"
                        />
                    </div>
                    <div className="flex-shrink-0 lg:mb-0.5">
                        <button type="submit" className="btn btn-primary btn-sm px-6 w-full lg:w-auto">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}; export default UpdateVendorForm;