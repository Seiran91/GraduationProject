import { Component, OnInit } from '@angular/core';
import {  Student } from '../Student';
import { ConnectionService } from '../connection.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private connectionService: ConnectionService,
    private fb: FormBuilder,
    private location: Location) { }
  
  registerForm: FormGroup;
  
  ngOnInit(): void {
    this.createForm();
  }
  
  pattern="^([a-z]+([0-9.\-_]*[a-z0-9]+)*@{1}[a-z]+\.{1}[a-z]+)+$";

  createForm(){
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern(this.pattern)]],
      Title: ['', [Validators.required]]
    },
    { updateOn: "blur" }
    );
  }
  /* ---Description for get method bellow---
        
  Retrieves a child control given the control's name or path
        *SOS*
  Without this i dont have instance of the variable which occur errors when you make validations in template
  for example i cant use name.invalid in *ngIf because the name its not identify with
  the property of registerForm.name above!!! This is how we bind 'name' variable for use in the template
  except in the fields where we use direct binding with the 'formControlName' of angular(look input of the
    name section in the template) 
  */
  get Name() { return this.registerForm.get("Name"); }
  get Email() { return this.registerForm.get("Email"); }
  get Title() { return this.registerForm.get("Title"); }

  newStudent() {
    this.connectionService.addStudent(this.registerForm.value)
    .subscribe(
      data =>{
        //The unary + operator its operand convert it to Number type otherwise we get type incompatibility error
        const std = {Name: this.registerForm.get('Name').value, id: +data};
        // We push our registered student in Students List array to update the list and view
        this.connectionService.students.push(std);
        alert("Student added succesfully with \n id: "+ data + "\n Name: " + std.Name);
        this.resetForm();
        },
      err =>{
        console.log(err)
      }
    ); 
  }
  back():void{
    this.location.back();
  }
  resetForm(){
    this.registerForm.reset();
  }

}
