import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import StudentList from './Components/StudentsList';
import DetailsView from './Components/DetailsView';
import RegLink from './Components/RegisterView';
import Login from './Components/Login';
import { getData } from './Components/requestsService';
import { updateGlobalData } from './Components/backendUrl';
import { NoMatch } from './Components/404error';

function App() {
  getData().then(res => updateGlobalData(res)).catch(console.error())
  /* 
  Using global variables it's bad programming practice but in this case we use them on purpose to
  show the possibilities of these frameworks!
  */

  return (
    <div className="App">
      <header className="App-header">
        <h2>React</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>MVC</h2>
      </header>
      <Router>
        <Switch>
          <Route exact path = "/">
            <Redirect to = "/StudentList" />
          </Route>
          <Route exact path = "/StudentList" component = {StudentList} />
          <Route exact path = "/StudentDetails/:id" component = {DetailsView} />
          <Route exact path = "/RegLink" component = {RegLink} />
          <Route exact path = "/Login" component = {Login} />
          <Route path = "*" component={NoMatch} />
        </Switch>
      </Router>

     </div>
  );
}

export default App;
