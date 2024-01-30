
import React from 'react';
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/archana-ticket-booking">Archana Ticket Booking</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;