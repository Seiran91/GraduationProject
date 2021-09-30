import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { Student } from '../Student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  searchText: string = "";
  students: Student[];
  userLogged: boolean;

  constructor(private connectionService: ConnectionService) {
   }

   // Initialize students list by calling getList method below
  ngOnInit(): void {
    this.getList();
    this.userLogged = this.connectionService.User.logged;
  }

  // Get data from connectionService which is responsible for requests to the server!
  getList(): void {
    this.students = this.connectionService.students;
    }
}
