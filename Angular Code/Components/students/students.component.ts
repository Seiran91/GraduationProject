import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ConnectionService } from '../../Services/connection.service';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  searchText: string = "";
  students: Student[];
  
  constructor(public connectionService: ConnectionService) {}

   // Initialize students list by calling getList method below
  ngOnInit(): void {
    this.getList();
  }

  // Get data from connectionService which is responsible for requests to the server!
  getList(): void {
    this.students = this.connectionService.students;
    }
}