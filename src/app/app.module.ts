import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {StudentComponent} from "./student/student.component";
import {StudentService} from "./student-service";
import {AppRoutes} from "./app.routing";
import {HeaderComponent} from "./header/header.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
		HttpModule,
    HttpClientModule,
		ReactiveFormsModule,
    AppRoutes
  ],
  declarations: [
        AppComponent, StudentComponent, HeaderComponent
  ],
  providers: [
        StudentService
  ],
  bootstrap: [
        AppComponent
  ]
})

export class AppModule { }
