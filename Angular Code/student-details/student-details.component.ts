import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent implements OnInit {

  detailedStudent: any;
  edit: boolean = false;
  valuesHasChanged = false;
  req_error_msg: string = "Content which are you looking for doesn't exist";
  editForm: FormGroup;
  userLogged = false;
  
  constructor(private route: ActivatedRoute,
    private studentService: ConnectionService,
    private fb: FormBuilder,
    private location: Location) {
    
  }

  ngOnInit(): void {
    this.userLogged = this.studentService.User.logged;
    this.getStudentDetails();
  }

  getStudentDetails(): void {
    const reqStudent = this.location.path();
    this.studentService.getStudentDetails(reqStudent)
      .subscribe(
        response => {this.detailedStudent = response, this.createForm()},
        err => {console.log(err.message);}
        );
  }

  createForm(){
    this.editForm = this.fb.group({
      Name: [this.detailedStudent.Name, [Validators.required]],
      Email: [this.detailedStudent.Email, [Validators.required, Validators.pattern('^([a-z]+([0-9.\-_]*[a-z0-9]+)*@{1}[a-z]+\.{1}[a-z]+)+$')]],
      Title: [this.detailedStudent.Title, [Validators.required]]
    },
    { updateOn: "blur" }
    );
    // Below we check changes on form input
    this.editForm.valueChanges.subscribe(x => {
      //console.log('Form value changed');
      if((this.editForm.get('Name').value !== this.detailedStudent.Name) ||
        (this.editForm.get('Email').value !== this.detailedStudent.Email) ||
        (this.editForm.get('Title').value !== this.detailedStudent.Title)) {
          this.valuesHasChanged = true;
      } else {
        this.valuesHasChanged = false;
      }
    });
  }
  /* ---Description for get method bellow---
        
  Retrieves a child control given the control's name or path
        *SOS*
  Without this i dont have instance of the variable which occur errors when you make validations in template
  for example i cant use Name.invalid in *ngIf because the name its not identify with
  the property of editForm.Name above!!! This is how we bind 'Name' variable for use in the template
  except in the fields where we use direct binding with the 'formControlName' of angular(look input of the
    name section in the template) 
  */
  get Name() { return this.editForm.get("Name"); }
  get Email() { return this.editForm.get("Email"); }
  get Title() { return this.editForm.get("Title"); }

  updateStudent(){
    var studentURL = this.location.path();
    var id = this.route.snapshot.paramMap.get("id");
    var index = this.studentService.students.findIndex(function(item, i){
      return item.id == +id;
    });
    // Here the only field that is visible and we need to update is the Name field, the others are fetched from db
    // when we ask for detail's
    this.studentService.updateStudent(studentURL, this.editForm.value)
    .subscribe(
      response => {
        console.log("Student with id: "+response+" updated succesfully!");
        console.log(this.editForm.value);
        this.studentService.students[index].Name = this.editForm.get('Name').value;
        this.detailedStudent.Name = this.editForm.get('Name').value;
        this.detailedStudent.Email = this.editForm.get('Email').value;
        this.detailedStudent.Title = this.editForm.get('Title').value;
        this.editShowHideBoolean();
      },
      err => {console.log(err)}
    );
    
  }
  deleteStudent(): void {
    const reqStudent = this.location.path();
    const id = +this.route.snapshot.paramMap.get("id");
    const index = this.studentService.students.findIndex(function(item, i){
      return item.id == +id;
    });
    
    this.studentService.deleteStudent(reqStudent)
    .subscribe(
      response => {
        console.log("Student with id: "+response+" deleted succesfully!");
        this.studentService.students.splice(index,1);
        this.location.back();
      },
      err => {console.log(err)}
    );
  }
  
  goBack(): void{
    this.location.back();
  }

  editShowHideBoolean(): void{
    this.edit = !this.edit;
  }

  IsItAdmin() {
    if(this.studentService.User.user == "admin"){
      return true;
    } else {
      return false;
    }
  }
}
