import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { Location } from '@angular/common';
import {  User, LoggedUser } from '../Student';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userLogged: LoggedUser;
  Loguser: User = {user: null, password: null};

  constructor(private userService: ConnectionService, private location: Location) { }

  ngOnInit(): void {
    this.userLogged = { user: this.userService.User.user, logged: this.userService.User.logged }
  }

  login() {
    this.userService.Login(this.Loguser)
    .subscribe( res =>{
      if(res){
        this.userLogged.logged = true;
        this.Loguser.user=null;
        this.Loguser.password=null;
      } else {
        alert("Authentication failed!");
      }
    },
    err =>{
      console.log(err)
    })
  }

  logout() {
    this.userService.Logout();
    console.log("Logged out!");
    this.userLogged.logged = false;
  }

  back() {
    this.location.back();
  }

}
