import ResetButton from "../components/ResetButton";

function Home({backendURL}) {
    return (
        <>
        <div className='card bg-base-100 max-w-full border border-primary shadow-lg p-4'>
            <div className="homepageDescription">
                <h1 className='text-xl font-bold text-center text-primary'>
                    Dylan^2 Candy Crafters | Internal Dashboard
                </h1>
                <div label="mainBody" className="flex flex-col justify-center items-center">
                    <h3 className="text-md p-4 max-w-[690px] text-center">
                        Welcome to the central hub for Dylan^2 Candy Crafters. This portal connects our 
                        5-person team, including owners Dylan and Dylan, to our operations, moving us away 
                        from old pen-and-paper ledgers and into a unified digital workspace.
                    </h3>
                    <h3 className="text-md p-4 max-w-[690px] text-center">
                        Our goal is to streamline our backend so we can focus on expanding across the PNW, 
                        crafting new recipes, and taking care of business.
                    </h3>
                    <br></br>
                    <h2 className="text-lg font-bold text-center mb-2 text-primary">
                        Helpful Data
                    </h2>
                    <div className="overflow-x-auto w-full max-w-2xl mx-auto border border-primary rounded-xl">
                        <table className="table table-zebra ">
                            {/*table body*/}
                            <tbody>
                            <tr>
                                <td className="font-semibold">Active Candy Catalog</td>
                                <td>15</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Current Customers</td>
                                <td>30</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Warehouse Capacity</td>
                                <td>25 Bins (19-gallons each)</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Site Service Contact</td>
                                <td>
                                    <a href="https://www.linkedin.com/in/dylan-keyhantaj/" className="text-green-700 underline">Dylan Keyhantaj</a>
                                    {" and "}
                                    <a href="https://www.linkedin.com/in/dylan-knapp-a5463638a/" className="text-green-700 underline">Dylan Knapp</a>
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <div className="flex flex-col">
                        <h1 className="text-md pb-2 font-bold underline">Reset the database entirely:</h1>
                        <ResetButton className="max-w-4" backendURL={backendURL}></ResetButton>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} export default Home;