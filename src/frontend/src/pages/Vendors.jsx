// Citation for the following module:
// Date: 06/08/2026
// Based on: Structure of GET requests calling in "getData()", OSU CS340 Pages
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188


import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateVendorForm from '../components/CRUD_Vendors/FormCreateVendor';
import UpdateVendorForm from '../components/CRUD_Vendors/FormUpdateVendor';


function Vendors({ backendURL }) {

    // Set up a state variable `vendors` to store and display the backend response
    const [vendors, setVendors] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/vendors');

            // Convert the response into JSON format
            const { vendors } = await response.json();

            // Update the vendors state with the response data
            setVendors(vendors);

        } catch (error) {
            // If the API call fails, print the error to the console
            console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className='card bg-base-100 max-w-full border border-base-300 shadow-md mb-6'>
                <div className='card-body'>
                    <h1 className='text-xl font-bold text-base-content'>All Vendors</h1>

                    <table className='table table-zebra'>
                        <thead className='text-base text-primary'>
                            <tr>
                                {vendors.length > 0 && Object.keys(vendors[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {vendors.map((candy, index) => (
                                <TableRow key={index} rowObject={candy} backendURL={backendURL}/>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            <CreateVendorForm></CreateVendorForm>
            <UpdateVendorForm vendors={vendors}></UpdateVendorForm>
        </>
    )
}
 export default Vendors;