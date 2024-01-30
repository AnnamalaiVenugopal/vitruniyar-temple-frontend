import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArchanaTicketBooking from './ArchanaTicketBooking/ArchanaTicketBooking.js';
import Header from './Header/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <ArchanaTicketBooking/>
    </div>
  );
}

export default App;
