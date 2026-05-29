const CreateVendorForm = ({ backendURL }) => {

    return (
        <div className="card bg-base-100 max-w-full border border-base-300 shadow-md mb-6 mt-6">
            <div className="card-body p-4">
                <div className="flex-shrink-0 lg:mb-3">
                    <h2 className="text-lg font-bold text-base-content">Create a Vendor</h2>
                </div>

                <form className="flex flex-wrap items-end gap-6" onSubmit={e => {e.preventDefault()}}>
                    <div className="form-control w-full max-w-[250px]">
                        <label htmlFor="createVendorName" className="label py-1">
                            <span className="label-text font-semibold text-xs">Vendor Name</span>
                        </label>
                        <input
                            type="text"
                            name="createVendorName"
                            id="createVendorName"
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

export default CreateVendorForm;
