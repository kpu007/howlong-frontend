import React, {useState, useEffect} from 'react'
import dateService from '../services/dateService'
import BootstrapTable from 'react-bootstrap-table-next'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const ArchivedDateTable = () => {
    const [dates, setDates] = useState([])
    const headerColor = '#EBF5FF'

    useEffect(() => {
        //WIP, need to handle incorrect dates and add a date selector
        dateService.getArchivedDatesForDate(new Date('5/24/2021').setHours(0, 0, 0, 0)).then(response => {
          console.log(response.data)
          setDates(response.data)
        })
      }, [])  
     
      const dateFormatter = (cell, row) => {
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
                    <BootstrapTable bootstrap4={true} keyField='dateName' data={dates} columns={columns}/>
                </div>
            </div>
        </div>
      )    
}

export default ArchivedDateTable;
