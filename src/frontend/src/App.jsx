import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Candies from './pages/Candies';
import Orders from './pages/Orders';
import InventorySpaces from './pages/InventorySpaces';
import Vendors from './pages/Vendors';

// Components
// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_BACKEND_PORT;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/candies">Candies</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory Spaces</Link>
                <Link to="/vendors">Vendors</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/candies" element={<Candies backendURL={backendURL} />} />
                <Route path="/orders" element={<Orders backendURL={backendURL} />} />
                <Route path="/inventory" element={<InventorySpaces backendURL={backendURL} />} />
                <Route path="/vendors" element={<Vendors backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;