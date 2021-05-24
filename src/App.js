import React, {useState, useEffect} from 'react'
import dateService from './services/dateService'
import BootstrapTable from 'react-bootstrap-table-next'
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

    let dateValue = new Date(dateObj.dateArray[timePeriod])

    if(findDateDifference(dateValue, new Date('January 1, 1970')) == 0) {
      return "Data not tracked to this point yet!"
    }

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

  const columns = [{
    dataField: 'dateName',
    text: 'Date Name',
    sort: true
  }, {
    dataField: 'currentDate',
    text: 'Current Date',
    sort: true,
    formatter: dateFormatter
  }, {
    dataField: 'oneDayDifference',
    text: 'Progress since yesterday',
    isDummyField: 'true',
    formatter: createTimeDifferenceFunction(1)
  }, {
    dataField: 'sevenDayDifference',
    text: 'Progress since 7 days',
    isDummyField: 'true',
    formatter: createTimeDifferenceFunction(7)
  }, {
    dataField: 'thirtyDayDifference',
    text: 'Progress since 30 days',
    isDummyField: 'true',
    formatter: createTimeDifferenceFunction(30)
  },]

  return (
    <div className="App">
      <BootstrapTable keyField='dateName' data={dates} columns={columns} />
    </div>
  );
}

export default App;
