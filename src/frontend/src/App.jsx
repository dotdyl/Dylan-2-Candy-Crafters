import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import BSGPeople from './pages/BSGPeople';
import Candies from './pages/Candies';

// Components

// Define the backend port and URL for API requests
const backendPort = 5000;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/bsg-people">BSG People</Link>
                <Link to="/candies">Candies</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bsg-people" element={<BSGPeople backendURL={backendURL} />} />
                <Route path="/candies" element={<Candies backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;