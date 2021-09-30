import React from 'react';
import { sendData } from './requestsService';
import { globalData, updateGlobalData, User} from './backendUrl';
import "bootstrap/dist/css/bootstrap.css";
import './nav.css';


class RegLink extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        nameErr: null,
        emailErr: null,
        titleErr: null,
        touched: false
      }
      this.registerPerson = this.registerPerson.bind(this);
      this.Back = this.Back.bind(this);
      this.checkName = this.checkName.bind(this);
      this.checkEmail = this.checkEmail.bind(this);
      this.checkTitle = this.checkTitle.bind(this);
      this.redirect = this.redirect.bind(this);
    }

registerPerson(e){
    e.preventDefault();
    const name = document.getElementById('RegName').value;
    const email = document.getElementById('RegEmail').value;
    const title = document.getElementById('RegTitle').value;
    if((name.length && email.length && title.length) > 0){
      const student = {Name: name, Email: email, Title: title};
      sendData(student)
          .then(response => {
              if(Number.isInteger(response)){
                  var a = globalData;
                  a.push({Name: student.Name, id: JSON.stringify(response)});
                  updateGlobalData(a);
                  document.getElementById('RegName').value = '';
                  document.getElementById('RegEmail').value = '';
                  document.getElementById('RegTitle').value = '';
                  alert("New data inserted");
              } else {alert(response)}
          })
          .catch(console.error());
      } else {
        alert("You have to fill all the fields!");
      }
}

Back(){
    // goBack() doesn't work properly if the button which call this is included in form
    this.props.history.goBack();
}
redirect(){
  this.props.history.push('/Login');
}
checkName(event){
    this.setState({touched: true});
    if(event.target.value !== ''){
      this.setState({nameErr: null});
    } else {
      this.setState({nameErr: "Name required!"});
    }
  }
  checkEmail(event){
    const val = event.target.value;
    const check = /^([a-zA-Z]+([0-9.\-_]*[a-z0-9]+)*@{1}[a-z]+\.{1}[a-z]+)+$/;
    this.setState({touched: true});

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
    this.setState({touched: true});
    if(event.target.value !== ''){
      this.setState({titleErr: null});
    } else {
      this.setState({titleErr: "Title required!"});
    }
  }

render(){
  if(User.logged){
    return (
        <div className="half-width">
            <div className="back-btn">
                        <button className="btn btn-secondary" onClick={this.Back} >
                        <i className="fa fa-arrow-circle-left"></i>Back
                        </button>
                    </div>
            <form onSubmit={this.registerPerson} className="register-form">
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input type="text" className="form-control" onBlur={this.checkName} id="RegName" placeholder="Enter Full Name" />
                    <p className="error">{this.state.nameErr}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="EmailInput">Email address</label>
                    <input type="email" className="form-control" onBlur={this.checkEmail} id="RegEmail" placeholder="Enter email" />
                    <p className="error">{this.state.emailErr}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="TitleArea">Title</label>
                    <textarea className="form-control" onBlur={this.checkTitle} id="RegTitle" rows="4" placeholder="Enter Title"></textarea>
                    <p className="error">{this.state.titleErr}</p>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.touched}>Submit</button>
            </form>
        </div>
        );
      } else {
        return (
        <div>
          <h1>You have to Log in first to see this sites content!</h1>
          <button className="btn btn-secondary" onClick={this.redirect}>Login</button>
        </div>
        );
      }
    } 
}

export default RegLink;