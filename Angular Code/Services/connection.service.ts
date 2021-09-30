import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Student, StudentDetails, LoggedUser, User } from '../Components/Student';
import { Observable, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {

  constructor(
    private http: HttpClient,
    private location: Location
    ) {
      
    }

  private baseURL = 'http://localhost/connection.php';
  private userURL = 'http://localhost/users.php';

  User: LoggedUser = {user: "Login", logged: false};
  students: Student[];

  // initDataFun called once application starts for initialize data
  initDataFun(): Promise<Boolean> {
    return new Promise<Boolean>((resolve)=>{
        this.getStudentsList()
        .subscribe(
          data => { this.students = data },
          err => { console.log("Something went wrong!\n" + err.message), resolve(false) },
          () => {resolve(true)}
        );
    });
  }

  /* GET requests begin here */
  getStudentsList(): Observable <Student[]> {

    return this.http.get<Student[]>(this.baseURL)
    .pipe(
      catchError((err) =>{
        return throwError(err);
      }));
  }

  getStudentDetails(reqStudent: string): Observable <StudentDetails[]> {
    return this.http.get<StudentDetails[]>(`${this.baseURL}${reqStudent}`)
    .pipe(
      catchError((err) =>{
        return throwError(err);
      })
    )
  }
  /* GET requests end here */

/*---------------------------------------------*/

  /* POST requests begin here */
  addStudent(student: StudentDetails) {
    return this.http.post<StudentDetails>(this.baseURL, student)
    .pipe(
      catchError((err) =>{
        return throwError(err.message);
      })
    )
  }
  /* POST requests end here */

/*---------------------------------------------*/

  /* PUT requests begin here */
  updateStudent(studentURL: string, student: StudentDetails) {
    return this.http.put<StudentDetails>(`${this.baseURL}${studentURL}`, student)
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
    return this.http.delete(`${this.baseURL}${reqStudent}`)
    .pipe(
      catchError((err) =>{
        return throwError(err.message);
      })
    )
  }

  /* DELETE requests end here */

  Login(user: User){
      return this.http.post<User>(this.userURL, user)
      .pipe(
        tap(res => {
          if(res){
            console.log("Login success!");
            this.User.user = user.user;
            this.User.logged = true;
          } else {
            return false;
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