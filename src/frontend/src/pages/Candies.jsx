import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCandyForm from '../components/CRUD_Candies/CreateCandy';



function Candies({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [candies, setCandies] = useState([]);
    const [homeworlds, setHomeworlds] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/candies');

            // Convert the response into JSON format
            const { candies } = await response.json();

            // Update the people state with the response data
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
            <h1>All Candies</h1>

            <table>
                <thead>
                    <tr>
                        {candies.length > 0 && Object.keys(candies[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {candies.map((candy, index) => (
                        <TableRow key={index} rowObject={candy} backendURL={backendURL} refreshCandy={getData} />
                    ))}

                </tbody>
            </table>

            <CreateCandyForm></CreateCandyForm>
        </>
    )
} export default Candies;