import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import { getData } from './requestsService';
import { globalData, updateGlobalData } from './backendUrl';
import "bootstrap/dist/css/bootstrap.css";
import './nav.css'

class StudentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      students: [],
      filteredStudents: []
    }
    
    this.handleSearch = this.handleSearch.bind(this);
  }
  /*
      componentDidMount() is initializer of the view and called every time when this view is rendering,
      thats why i store data in global variable "globalData" where we fetch data from the database
      and store them in it and with the If condition in essence we prevent
      to make requests to database more then once!

      This practice is not suggested because we use global variables!
      */
    componentDidMount(){
     if(globalData === ''){
      const data = getData();
      data.then(res => {
        updateGlobalData(res);
        this.setState({students: res, filteredStudents: res});
      })
      .catch(console.error())
      } else {
        this.setState({students: globalData, filteredStudents: globalData});
      }
    }

    handleSearch (event) {
      if(event.target.value.length !== 0){
        let searchVal = event.target.value.toLowerCase();
        this.setState({
          filteredStudents: this.state.students.filter(result =>{
            return result.Name.toLowerCase().includes(searchVal.toLowerCase());
          }) 
        })
      }else {
        this.setState({filteredStudents: this.state.students})
      }
    }

    render(){
      return (
        <div className="half-width">
          <NavLinks />
          <ul className="list-group">
            <input type="text" onChange={(event) =>this.handleSearch(event)} placeholder="Search..." />
              { this.state.filteredStudents.map( list =>
                  <li key={list.id} className="list-group-item list-group-item-action">
                    <Link to={`StudentDetails/${list.id}`}>
                      <span >
                        {list.Name}
                      </span>
                    </Link>
                  </li>
              ) }
          </ul>
        </div>
      );
    }
  }
  export default StudentList;