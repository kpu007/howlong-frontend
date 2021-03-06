import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {Button} from "@material-ui/core"
import ProgressTable from './components/ProgressTable.js'
import ArchivedDateTable from './components/ArchivedDateTable.js'
import Information from './components/Information.js'
import NotFound from './components/NotFound.js'
import UpdatePanel from './components/UpdatePanel.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {

  return (    
    <div className="App" alignItems="center">
      <h1>Date Tracker</h1>
      <Router>
        <div>
          <Button color="primary" component={Link} to="/progress">
            Progress Table
          </Button>
          <Button color="primary" component={Link} to="/archive">
            Archive Viewer
          </Button>
          <Button color="primary" component={Link} to="/information">
            Help
          </Button>
          <Button color="primary" component={Link} to="/update">
            Update
          </Button>
        </div>

        <Switch>
          <Route exact path="/">
            <Redirect to="/progress" />
          </Route>
          <Route path="/progress">
            <ProgressTable />
          </Route>
          <Route path="/archive">
            <ArchivedDateTable />
          </Route>          
          <Route path="/information">
            <Information />
          </Route>
          <Route path="/update">
            <UpdatePanel />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>      
    </div>
  )
}

export default App;
