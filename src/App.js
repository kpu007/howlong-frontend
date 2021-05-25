import React, {useState, useEffect} from 'react'
import dateService from './services/dateService'
import BootstrapTable from 'react-bootstrap-table-next'
import './App.css';

function App() {

  const [dates, setDates] = useState([])
  const progressPoints = [1, 2, 3, 4, 5, 6, 7, 15, 30]

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
      return "N/A"
    }

    let dateValue = new Date(dateObj.dateArray[timePeriod])

    return findDateDifference(new Date(dateObj.currentDate), dateValue)
  }

  const createTimeDifferenceFunction = (timePeriod) => {
    const resultFunction = (cell, row) => getDifferenceBetweenTime(row, timePeriod)
    return resultFunction
  }

  const dateFormatter = (cell, row) => {
    const dateVariable = new Date(row.currentDate)
    const year = dateVariable.getFullYear()
    const day = dateVariable.getDate()
    const month = dateVariable.getMonth() + 1 //months are zero-indexed
    const dateString = month + "/" + day + "/" + year

    return (
        <div>
            {dateString}
        </div>
    )
  }

  const createProgressColumn = (point) => {
    return {
      dataField: point + "DayDifference",
      text: point,
      isDummyField: 'true',
      formatter: createTimeDifferenceFunction(point)
    }
  }

  const staticColumns = [{
    dataField: 'dateName',
    text: 'Date Name',
    sort: true
  }, {
    dataField: 'currentDate',
    text: 'Current Date',
    sort: true,
    formatter: dateFormatter
  }]

  const progressColumns = progressPoints.map(point => createProgressColumn(point))
  const columns = staticColumns.concat(progressColumns)

  return (
    <div className="App">
      <BootstrapTable keyField='dateName' data={dates} columns={columns} />
    </div>
  );
}

export default App;
