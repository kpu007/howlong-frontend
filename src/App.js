import React, {useState, useEffect} from 'react'
import dateService from './services/dateService'
import logo from './logo.svg';
import './App.css';

function App() {

  const [dates, setDates] = useState([])

  useEffect(() => {
    dateService.getAll().then(response => {
      console.log(response.data)
      setDates(response.data)
  })
  }, [])  

  const Row = ({date}) => {
    console.log(date.dateName)

    return (
      <tr>
        <td>
          {date.dateName}
        </td>
        <td>
          {date.currentDate}
        </td>
      </tr>
    )
  }

  return (
    <div className="App">
      <table>
        <tbody>
          {dates.map(date => <Row date={date}/>)}
        </tbody>
      </table>

      
    </div>
  );
}

export default App;
