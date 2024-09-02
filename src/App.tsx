import React, { useEffect, useState } from 'react';
import MainLayout from './components/MainLayout';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   fetch("/api/get-message?name=Static Web Apps")
  //   .then(res => res.text())
  //   .then(data => setMessage(data));
  // }, []);
  return (
    <DataProvider>
      <div className="App">
        <MainLayout />
      </div>
    </DataProvider>
    
  );
}

export default App;
