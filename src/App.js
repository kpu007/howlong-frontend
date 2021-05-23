import React, {useState, useEffect} from 'react'
import dateService from './services/dateService'
import './App.css';

function App() {

  const [dates, setDates] = useState([])

  useEffect(() => {
    dateService.getAll().then(response => {
      console.log(response.data)
      setDates(response.data)
  })
  }, [])  

  const findDateDifference = (date1, date2) => {
    const msDifference = Math.abs(date2 - date1)
    const dateDifference = Math.ceil(msDifference / (1000 * 60 * 60 * 24))
    return dateDifference
  }

  const getDifferenceBetweenTime = (dateObj, timePeriod) => {
    if(!dateObj.dateArray) {
      return "No date array found!"
    }

    if(dateObj.dateArray.length <= timePeriod) {
      return "Data not tracked to this point yet, array not long enough!"
    }

    //need to convert to date because mongoose apparently gets them as strings
    let dateValue = new Date(dateObj.dateArray[timePeriod])

    if(findDateDifference(dateValue, new Date('January 1, 1970')) == 0) {
      return "Data not tracked to this point yet!"
    }

    return findDateDifference(new Date(dateObj.currentDate), dateValue)
  }

  const formatDateNicely = (date) => {
    const year = date.getFullYear()
    const day = date.getDate()
    const month = date.getMonth() + 1 //months are zero-indexed

    return month + "/" + day + "/" + year
  }

  const Row = ({date}) => {
    console.log(date.dateName)

    return (
      <tr>
        <td>
          {date.dateName}
        </td>
        <td>
          {formatDateNicely(new Date(date.currentDate))}
        </td>
        <td>
          {getDifferenceBetweenTime(date, 1)}
        </td>
        <td>
          {getDifferenceBetweenTime(date, 7)}
        </td>
        <td>
          {getDifferenceBetweenTime(date, 30)}
        </td>
      </tr>
    )
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Date Name</th>
            <th>Current Date</th>
            <th>Progress since the previous day</th>
            <th>Progress since 7 days</th>
            <th>Progress since 30 days</th>
          </tr>
        </thead>
        <tbody>
          {dates.map(date => <Row date={date}/>)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
