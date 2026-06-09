// Citation for the following module:
// Date: 06/08/2026
// Based on: Structure of GET requests calling in "getData()", OSU CS340 Pages
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateInventorySpaceForm from '../components/CRUD_InventorySpaces/FormCreateInventorySpace';
import UpdateInventorySpaceForm from '../components/CRUD_InventorySpaces/FormUpdateInventorySpace';



function InventorySpaces({ backendURL }) {

    // Set up state variables
    const [inventorySpaces, setInventorySpaces] = useState([]);
    const [candies, setCandies] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/inventory');

            // Convert the response into JSON format
            const { inventorySpaces, candies } = await response.json();

            // Update the inventorySpaces state with the response data
            setInventorySpaces(inventorySpaces);
            setCandies(candies);

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
            <div className='card bg-base-100 max-w-full border border-base-300 shadow-md'>
                <div className='card-body'>
                <h1 className='text-xl font-bold text-base-content'>All InventorySpaces</h1>

                <table className='table table-zebra'>
                    <thead className='text-base text-primary'>
                        <tr>
                        {inventorySpaces.length > 0 && Object.keys(inventorySpaces[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {inventorySpaces.map((space, index) => {

                        const matchCandy = candies.filter(c => {
                        const candyId = c.candyId
                        if (candyId == space.candyId){
                            return c
                        }
                        })[0]

                        console.log("Match: ", matchCandy)

                        let candyCol = `${space.candyId}`

                        if (matchCandy != undefined){
                            candyCol = `${space.candyId} - ${matchCandy.candyName}`
                        }

                        const rowObject = {
                            "inventoryId": space.inventoryId, 
                            "candyId": candyCol, 
                            "gallonsFilled": space.gallonsFilled,
                            "lastStocked": space.lastStocked
                        }

                        return (
                        <TableRow key={index} rowObject={rowObject} backendURL={backendURL} refreshCandy={getData} noDeleteButton={true}/>
                    )})}

                    </tbody>
                </table>
                </div>
            </div>

            <CreateInventorySpaceForm candies={candies}></CreateInventorySpaceForm>
            <UpdateInventorySpaceForm inventorySpaces={inventorySpaces} candies={candies}></UpdateInventorySpaceForm>
        </>
    )
} export default InventorySpaces;