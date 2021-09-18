import { Injectable } from '@angular/core';
import { Student, LoggedUser } from './Student';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ConnectionService {


  constructor( private http: HttpClient, private location: Location ) {

  }

  User: LoggedUser = {user: "Login", logged: false};
  initDataVar: any;

  private baseURL = 'http://localhost/connection.php';
  private userURL = 'http://localhost/users.php';
  //private baseURL = 'https://seiran.online/connection.php';
  //private userURL = 'https://seiran.online/users.php';
  students: Student[];
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // initDataFun called on app-start for initialize data for the application only
  initDataFun(): Promise<Boolean> {
    
    console.log("initDataFun() runs..");
    
    return new Promise<Boolean>((resolve)=>{
        //this.initDataVar = this.getStudentsList();
        this.getStudentsList()
        .subscribe(
          data => { this.students = data, resolve(true) },
          err => { console.log("Something went wrong!" + err), resolve(false) }
          );
        
    });    

  }

  getData(): Observable <Student[]>{
    console.log("getData() runs..");
    return this.initDataVar;
  }

  /* GET requests begin here */
  getStudentsList(): Observable <Student[]> {

    return this.http.get<Student[]>(this.baseURL)
    
    .pipe(
      catchError((err) =>{
        return throwError(err);
      }));
  }

  getStudentDetails(reqStudent: string): Observable <Student[]> {
    return this.http.get<Student[]>(`${this.baseURL}${reqStudent}`)
    .pipe(
      catchError((err) =>{
        return throwError(err);
      })
    )
  }
  /* GET requests end here */

/*---------------------------------------------*/

  /* POST requests begin here */
  addStudent(student: Student) {
    return this.http.post<Student>(this.baseURL, student)
    .pipe(
      catchError((err) =>{
        return throwError(err.message);
      })
    )
  }
  /* POST requests end here */

/*---------------------------------------------*/

  /* PUT requests begin here */
  updateStudent(studentURL: string, student: Student) {
    //console.log(student);
    return this.http.put<Student>(`${this.baseURL}${studentURL}`, student, this.httpOptions)
    .pipe(
      catchError((err) =>{
        return throwError(err.message);
      })
    )
  }
  /* PUT requests end here */

/*---------------------------------------------*/

  /* DELETE requests begin here */
  deleteStudent(reqStudent: string) {
    return this.http.delete<Student>(`${this.baseURL}${reqStudent}`, this.httpOptions)
    .pipe(
      catchError((err) =>{
        return throwError(err.message);
      })
    )
  }

  /* DELETE requests end here */

  Login(user){
      return this.http.post<any>(this.userURL, user)
      .pipe(
        tap(res => {
          if(res){
            console.log("Login success!");
            this.User.user = user.user;
            this.User.logged = true;
          }
        }),
        catchError((err) =>{
          return throwError(err.message);
        })
      )
  }

  Logout(){
      this.User = {user: "Login", logged: false};
  }
}