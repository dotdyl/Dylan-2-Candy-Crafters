import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Candies from './pages/Candies';
import Orders from './pages/Orders';
import InventorySpaces from './pages/InventorySpaces';
import Vendors from './pages/Vendors';

// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_BACKEND_PORT;  
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
    return (
        // The data-theme="light" attribute ensures a clean uniform layout across monitors
        <div className="min-h-screen bg-base-200 text-base-content font-sans" data-theme="dark">
            
            {/* daisyUI Header Navbar */}
            <header className="navbar bg-base-100 shadow-md px-4 sm:px-8">
                {/* Navbar Left: Logo */}
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl font-black text-primary gap-2">
                        <span>🍬</span> Candy Crafters
                    </Link>
                </div>
                
                {/* Navbar Right: Navigation Links */}
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-1 font-semibold">
                        <li>
                            <Link to="/" className="hover:bg-primary/10 rounded-lg">Home</Link>
                        </li>
                        <li>
                            <Link to="/candies" className="hover:bg-primary/10 rounded-lg">Candies</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="hover:bg-primary/10 rounded-lg">Orders</Link>
                        </li>
                        <li>
                            <Link to="/inventory" className="hover:bg-primary/10 rounded-lg">Inventory</Link>
                        </li>
                        <li>
                            <Link to="/vendors" className="hover:bg-primary/10 rounded-lg">Vendors</Link>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Main Content Layout Block */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Structural Wrapper Card for Page Context */}
                <div className="card bg-base-100 shadow-xl min-h-[calc(100vh-8rem)]">
                    <div className="card-body p-6 sm:p-10">
                        <Routes>
                            <Route path="/" element={<Home backendURL={backendURL} />} />
                            <Route path="/candies" element={<Candies backendURL={backendURL} />} />
                            <Route path="/orders" element={<Orders backendURL={backendURL} />} />
                            <Route path="/inventory" element={<InventorySpaces backendURL={backendURL} />} />
                            <Route path="/vendors" element={<Vendors backendURL={backendURL} />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;