import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { Location } from '@angular/common';
import {  User } from '../Student';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  Loguser: User = {user: null, password: null};

  constructor(public userService: ConnectionService, private location: Location) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.Login(this.Loguser)
    .subscribe( ()=>{
      //console.log("login-form success");
      this.Loguser.user=null;
      this.Loguser.password=null;
    },
    err =>{
      console.log(err)
    })
  }

  logout() {
    this.userService.Logout();
    console.log("Logged out!");
  }

  back() {
    this.location.back();
  }

}
