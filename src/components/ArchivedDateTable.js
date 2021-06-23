import React, {useState, useEffect} from 'react'
import dateService from '../services/dateService'
import metaService from '../services/metaService'
import BootstrapTable from 'react-bootstrap-table-next'
import DatePicker from 'react-date-picker';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const ArchivedDateTable = () => {
    const [dates, setDates] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [firstArchivedDate, setFirstArchivedDate] = useState(new Date())
    const headerColor = '#EBF5FF'

    const updateDates = () => {
      dateService.getArchivedDatesForDate(currentDate).then(response => {
        setDates(response.data)
      })
    }

     useEffect(() => {
        //WIP, need to handle dates without data
        metaService.getFirstArchivedDate().then(resultDate => setFirstArchivedDate(new Date(resultDate)))
        updateDates()
      }, [])  
    
      //The error message from the backend doesn't have any numbers
      const containsNumber = (string) => {
        return /\d/.test(string);
      }

      const dateFormatter = (cell, row) => {
        if(!containsNumber(row.dateValue)) {
          return (
            <div>No data found!</div>
          )
        }

        const dateVariable = new Date(row.dateValue)
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

      const columns = [{
        dataField: 'dateName',
         text: 'Date Name',
         sort: true,
         headerStyle: {
           backgroundColor: headerColor,
           width: '30%'
         }
       }, {
         dataField: 'dateValue',
         text: 'Date Value',
         sort: true,
         formatter: dateFormatter,
         headerStyle: {
           backgroundColor: headerColor,
           width: '25%'
         }
       }]  
 
    
      return (
        <div className="App" alignItems="center">
            <div>
                <div class="center" style={{width:"80%"}}>
                  <DatePicker onChange={setCurrentDate} value={currentDate} minDate={firstArchivedDate}/>
                  <br/>
                  <br/>
                  <BootstrapTable bootstrap4={true} keyField='dateName' data={dates} columns={columns}/>
                </div>
            </div>
        </div>
      )    
}

export default ArchivedDateTable;
