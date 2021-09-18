import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ConnectionService } from './connection.service';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FilterPipe } from './Pipes/filter/filter.pipe';
import { OrderPipe } from './Pipes/order/order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailsComponent,
    PagenotfoundComponent,
    RegisterComponent,
    LoginFormComponent,
    FilterPipe,
    OrderPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StudentsComponent, {provide : APP_INITIALIZER, useFactory : initFunction, deps: [ConnectionService] , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initFunction(config : ConnectionService)
{
  console.log("Initializer runs...");
  return () =>config.initDataFun();
}