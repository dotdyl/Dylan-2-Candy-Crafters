import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';



function InventorySpaces({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [inventorySpaces, setInventorySpaces] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/inventory');

            // Convert the response into JSON format
            const { inventorySpaces } = await response.json();

            // Update the people state with the response data
            setInventorySpaces(inventorySpaces);

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
            <h1>All InventorySpaces</h1>

            <table>
                <thead>
                    <tr>
                        {inventorySpaces.length > 0 && Object.keys(inventorySpaces[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {inventorySpaces.map((candy, index) => (
                        <TableRow key={index} rowObject={candy} backendURL={backendURL} refreshCandy={getData} />
                    ))}

                </tbody>
            </table>
        </>
    )
} export default InventorySpaces;