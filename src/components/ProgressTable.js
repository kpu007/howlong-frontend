import React, {useState, useEffect} from 'react'
import dateService from '../services/dateService'
import metaService from '../services/metaService'
import UsageGuide from './UsageGuide.js'
import BootstrapTable from 'react-bootstrap-table-next'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const ProgressTable = () => {

  const [dates, setDates] = useState([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const progressPoints = [1, 2, 3, 4, 5, 6, 7, 15, 30]
  const headerColor = '#EBF5FF'
  
  useEffect(() => {
    metaService.getLastUpdated().then(resultDate => setLastUpdated(new Date(resultDate)))
    dateService.getAll().then(resultDates => setDates(resultDates))
  }, [])  

  const findDateDifference = (date1, date2) => {
    const msDifference = Math.abs(date2 - date1)
    const dateDifference = Math.ceil(msDifference / (1000 * 60 * 60 * 24))
    return dateDifference
  }

  const findProgressOnSpecificDay = (dateObj, timePeriod) => {

    if(dateObj.dateArray.length <= timePeriod) {
      return 0;
    }

    const currentDate = new Date(dateObj.dateArray[timePeriod].archivedDateValue)
    const previousDate = new Date(dateObj.dateArray[timePeriod - 1].archivedDateValue)
  
    return findDateDifference(currentDate, previousDate)
  }

  const getDifferenceBetweenTime = (dateObj, timePeriod) => {
    if(!dateObj.dateArray) {
      return "No date array found!"
    }

    if(dateObj.dateArray.length <= timePeriod) {
      return "N/A"
    }

    let dateValue = new Date(dateObj.dateArray[timePeriod].archivedDateValue)
    let timePeriodDifference = findDateDifference(new Date(dateObj.lastUpdated).setHours(0, 0, 0, 0), new Date(dateObj.dateArray[timePeriod].archivedDateTime).setHours(0, 0, 0, 0))
    
    console.log(new Date(dateObj.lastUpdated).setHours(0, 0, 0, 0))
    console.log(timePeriodDifference + " " + timePeriod)

    /*
    if(timePeriodDifference != timePeriod) {
      return "Missing some date!"
    }
    */

    return findDateDifference(new Date(dateObj.currentDate), dateValue) + " (+" + findProgressOnSpecificDay(dateObj, timePeriod) + ")"
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

  const formatDateWithTimeZone = (dateVariable) => {
    return dateVariable.toLocaleDateString('en-US', {timeZone: 'UTC'}) + " " + dateVariable.toLocaleTimeString('en-US', {timeZone: 'UTC'}) + " " + "UTC"
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
      width: '15%'
    }
  }]

  const progressColumns = progressPoints.map(point => createProgressColumn(point))
  const columns = staticColumns.concat(progressColumns)

  return (
    <div className="App" alignItems="center">
      Last updated: {formatDateWithTimeZone(lastUpdated)}
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

export default ProgressTable;
