import React, {useState, useEffect} from 'react'
import dateService from './services/dateService'
import BootstrapTable from 'react-bootstrap-table-next'
import UsageGuide from './components/UsageGuide.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {

  const [dates, setDates] = useState([])
  const progressPoints = [1, 2, 3, 4, 5, 6, 7, 15, 30]
  const headerColor = '#EBF5FF'

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
    const dateString = formatDateNicely(dateVariable)
    return (
        <div>
            {dateString}
        </div>
    )
  }

  const formatDateNicely = (dateVariable) => {
    const year = dateVariable.getFullYear()
    const day = dateVariable.getDate()
    const month = dateVariable.getMonth() + 1 //months are zero-indexed
    const dateString = month + "/" + day + "/" + year
    return dateString
  }

  const createProgressColumn = (point) => {
    return {
      dataField: point + "DayDifference",
      text: point,
      isDummyField: 'true',
      formatter: createTimeDifferenceFunction(point),
      headerStyle: {
        backgroundColor: headerColor
      }
    }
  }


  const staticColumns = [{
    dataField: 'dateName',
    text: 'Date Name',
    sort: true,
    headerStyle: {
      backgroundColor: headerColor,
      width: '20%'
    }
  }, {
    dataField: 'currentDate',
    text: 'Current Date',
    sort: true,
    formatter: dateFormatter,
    headerStyle: {
      backgroundColor: headerColor,
      width: '20%'
    }
  }]

  const progressColumns = progressPoints.map(point => createProgressColumn(point))
  const columns = staticColumns.concat(progressColumns)

  return (
    <div className="App" alignItems="center">
      <h1>Date Tracker</h1>
      <br/>
      Last updated: {dates[0] ? formatDateNicely(new Date(dates[0].lastUpdated)) : ""}
      <br/>
      <br/>
      <div>
        <div class="center" style={{width:"80%"}}>
          <BootstrapTable bootstrap4={true} keyField='dateName' data={dates} columns={columns}/>
        </div>
        <UsageGuide/>
        <br/>
      </div>
    </div>
  )
}

export default App;
