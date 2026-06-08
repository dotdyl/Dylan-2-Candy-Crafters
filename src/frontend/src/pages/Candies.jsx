// Citation for the following module:
// Date: 05/28/2026
// Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCandyForm from '../components/CRUD_Candies/FormCreateCandy';
import UpdateCandyForm from '../components/CRUD_Candies/FormUpdateCandy';


function Candies({ backendURL }) {

    const [candies, setCandies] = useState([]);

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

    const onDelete = async (id) => {
      try {
        const response = await fetch(backendURL + `/candies/${id}`, {method: 'DELETE'});
        if (response.status == 200) {
          setCandies(candies.filter(e => {
            return e.candyId !== id;}));
        } else {
            const text = await response.json()
            alert(text)
        }
      } catch (err) {
        console.log(err);
      }
    }

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className='card bg-base-100 max-w-full border border-base-300 shadow-md'>
                <div className='card-body'>
                <h1 className='text-xl font-bold text-base-content'>All Candies</h1>

                <table className='table table-zebra'>
                    <thead className='text-base text-primary'>
                        <tr>
                            {candies.length > 0 && Object.keys(candies[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {candies.map((candy, index) => (
                            <TableRow key={index} rowObject={candy} backendURL={backendURL} refreshCandy={getData} onDelete={onDelete} />
                        ))}

                    </tbody>
                </table>
                </div>
            </div>

            <CreateCandyForm></CreateCandyForm>
            <UpdateCandyForm candies={candies}></UpdateCandyForm>
        </>
    )
} export default Candies;
