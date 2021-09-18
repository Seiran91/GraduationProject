import { Component } from '@angular/core';
import { ConnectionService } from './connection.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public userService: ConnectionService) { }
  title = 'RESTful Angular';
}
