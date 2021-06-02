import React, {useState, useEffect} from 'react'
import ProgressTable from './components/ProgressTable.js'
import ArchivedDateTable from './components/ArchivedDateTable.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {

  return (
    <div className="App" alignItems="center">
      <h1>Date Tracker</h1>
      <ProgressTable/>
    </div>
  )
}

export default App;
