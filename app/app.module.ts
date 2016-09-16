import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SchoolComponent } from './school.component';
import { SchoolFormComponent } from './school-form.component';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form.component';
import { AttendComponent } from './attend.component';
import { AttendFormComponent } from './attend-form.component';
import { AttendDayComponent } from './attend-day.component';

import { AppRouter } from './app.router'

@NgModule({
    imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	AppRouter
    ],

    declarations: [
	AppComponent,
	SchoolComponent,
	SchoolFormComponent,
	UserComponent,
	UserFormComponent,
	AttendComponent,
	AttendFormComponent,
	AttendDayComponent,
    ],

    bootstrap: [
	AppComponent
    ]
})

export class AppModule {
}
