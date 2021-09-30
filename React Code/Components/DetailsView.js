import React from 'react';
import { globalData, updateGlobalData, User } from './backendUrl';
import { deleteData, getDetails, updateDetails } from './requestsService';
import "bootstrap/dist/css/bootstrap.css";
import './nav.css';


class DetailsView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      details: [],
      showDetails: true,
      nameErr: null,
      emailErr: null,
      titleErr: null
    }
    this.setNewDetails = this.setNewDetails.bind(this);
    this.Delete = this.Delete.bind(this);
    this.Back = this.Back.bind(this);
    this.showForm = this.showForm.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkTitle = this.checkTitle.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount(){

    const url = this.props.match.url;
    getDetails(url).then(
        res => {
          this.setState({details: res});
      })
      .catch(error => {
      console.log(error);
    });
  }
  
  render(){
    if(User.logged){
    // In this case i'm using conditional rendering of the component to show different views for
    // the details View and the update form View by updating boolean variable in state(showDetails)
    if(this.state.showDetails){
      return (
        <div className="half-width">
            <div className="back-btn">
                <button className="btn btn-secondary" onClick={this.Back} >
                <i className="fa fa-arrow-circle-left"></i>Back
                </button>
            </div>
          <div className="half-width">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td><b>{this.state.details.Name}</b></td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td><b>{this.state.details.Email}</b></td>
                </tr>
                <tr>
                  <td>Title:</td>
                  <td><b>{this.state.details.Title}</b></td>
                </tr>
              </tbody>
            </table>
          
          <div className="act-btn">
            <button type="button" className="btn btn-success" onClick={this.showForm}>Update</button>
            <button type="button" className="btn btn-danger" onClick={this.Delete}>Delete</button>
          </div>
          </div>
        </div>
        )
    } else {
      return (
        <div className="half-width">
          <h1>Edit Details</h1>
          <form className="half-width">
            <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  onBlur={this.checkName}
                  placeholder="Enter Full Name"
                  defaultValue={this.state.details.Name} />
                <p className="error">{this.state.nameErr}</p>
            </div>
            <div className="form-group">
                <label htmlFor="EmailInput">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  onBlur={this.checkEmail}
                  placeholder="Enter email"
                  defaultValue={this.state.details.Email} />
                <p className="error">{this.state.emailErr}</p>
            </div>
            <div className="form-group">
                <label htmlFor="TitleArea">Title</label>
                <textarea
                  className="form-control"
                  id="Title"
                  rows="3"
                  onBlur={this.checkTitle}
                  placeholder="Enter Title"
                  defaultValue={this.state.details.Title} >
                </textarea>
                <p className="error">{this.state.titleErr}</p>
            </div>
            <div className="act-btn">
              <button className="btn btn-primary" onClick={this.setNewDetails} disabled={(this.state.nameErr || this.state.emailErr || this.state.titleErr) != null}>Submit</button>
              <button className="btn btn-secondary" onClick={this.showForm}>Cancel</button>
            </div>
          </form>
        </div>
        );
      }
    } else {
      return (
        <div className="half-width">
            <div className="back-btn">
                <button className="btn btn-secondary" onClick={this.Back} >
                <i className="fa fa-arrow-circle-left"></i>Back
                </button>
            </div>
            <div className="half-width">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td><b>{this.state.details.Name}</b></td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td><b>{this.state.details.Email}</b></td>
                </tr>
                <tr>
                  <td>Title:</td>
                  <td><b>{this.state.details.Title}</b></td>
                </tr>
              </tbody>
            </table>
            <br></br>
            <p>Log in to edit details</p>
            <button className="btn btn-secondary" onClick={this.redirect}>Login</button>
          </div>
        </div>
        );
    }
  }

  checkName(event){
    if(event.target.value !== ''){
      this.setState({nameErr: null});
    } else {
      this.setState({nameErr: "Name required!"});
    }
  }
  checkEmail(event){
    const val = event.target.value;
    const check = /^([a-zA-Z]+([0-9.\-_]*[a-z0-9]+)*@{1}[a-z]+\.{1}[a-z]+)+$/;
    

    if(val === ''){
      this.setState({emailErr: "Email is required"});
    }
    else if (!check.test(val)) {
      this.setState({emailErr: "Email is not valid!"});
    }
    else {
      this.setState({emailErr: null});
    }
  }
  checkTitle(event){
    if(event.target.value !== ''){
      this.setState({titleErr: null});
    } else {
      this.setState({titleErr: "Title required!"});
    }
  }
  redirect(){
    this.props.history.push('/Login');
  }
  showForm(){
    this.setState({showDetails: !this.state.showDetails});
  }

  setNewDetails(e){
    const url = this.props.match.url;
    const id = this.props.match.params.id;
    e.preventDefault();

    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const title = document.getElementById('Title').value;
    const student = {Name: name, Email: email, Title: title};

    /* Here is the request to UPDATE function to update the student in db */
    updateDetails(url, student)
    .then(() => {
      console.log(`Before:\nName: ${this.state.details.Name}\nEmail: ${this.state.details.Email}\nTitle: ${this.state.details.Title}`);
      this.setState({details: {Name: name, Email: email, Title: title} });
      console.log(`After:\nName: ${name}\nEmail: ${email}\nTitle: ${title}`);
      const index = globalData.findIndex(function(data, i){
        return data.id === id
      });
      var a = globalData;
      a[index].Name = this.state.details.Name;
      const temp = Object.assign(globalData, a);
      updateGlobalData(temp);
      this.showForm();
    })
    .catch(error => {
      console.log(error);
    });
    
  }
  
  Delete(){
    const url = this.props.match.url;
    const id = this.props.match.params.id;
    deleteData(url)
      .then(() => {
        const index = globalData.findIndex(function(data, i){
          return data.id === id
        });
        var a = globalData;
        a.splice(index, 1);                         // Remove deleted person from the list
        const temp = Object.assign(globalData, a);  // Assign the changes in the list
        updateGlobalData(temp);                     // Update global variable for the new list

        this.props.history.push('/StudentList');
        console.log('The student deleted!');
      })
      .catch(error=>{
        console.log(error);
      });
  }

  Back(){
    this.props.history.goBack();
  }

}

export default DetailsView;