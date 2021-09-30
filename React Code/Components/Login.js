import React from 'react';
import {getUser} from './requestsService';
import {authUser, authentication, Logout} from './backendUrl';
import './nav.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            User: "Login",
            Logged: false
        }
        this.authReq = this.authReq.bind(this);
        this.back = this.back.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        const user = authUser();
        this.setState({User: user.user, Logged: user.logged});
    }

    render(){
        if(this.state.Logged){
            return (
                <div className="half-width">
                    <div className="back-btn">
                        <button className="btn btn-secondary" onClick={this.back} >
                        <i className="fa fa-arrow-circle-left"></i>Back
                        </button>
                    </div>
                    <div>
                        <h1>Welcome {this.state.User}</h1>
                        <button className="btn btn-danger" onClick={this.logout} >Log out</button>
                    </div>
                </div>
                    );
        } else {
            return (
                <div className="half-width">
                    <div className="back-btn">
                        <button className="btn btn-secondary" onClick={this.back} >
                        <i className="fa fa-arrow-circle-left"></i>Back
                        </button>
                    </div>
                    <div  className="login-form">
                        <form>
                            <h2>Log in</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" id="Username" placeholder="User" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="Password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.authReq}>Submit</button>
                            
                        </form>
                    </div>
                </div>
            );
        }
    }
    authReq(e){
        e.preventDefault();
        const user = document.getElementById('Username').value;
        const password = document.getElementById('Password').value;
        const data = {user,password};
        const authuser = {user: data.user, state: true};
        getUser(data)
            .then(response => {
                if(response){
                authentication(authuser);
                this.setState({User: user, Logged: true});
                } else {alert("Authentication failed!")}
            })
            .catch(console.error);
    }
    back(){
        this.props.history.goBack();
    }
    logout(){
        Logout();
        this.setState({User: "Login", Logged:false});
    }
}

export default Login;