import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from '../Components/students/students.component';
import { StudentDetailsComponent } from '../Components/student-details/student-details.component';
import { PagenotfoundComponent } from '../Components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LoginFormComponent } from '../Components/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent, pathMatch: 'full'},
  { path: 'student/:id', component: StudentDetailsComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent, pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
