import { Component, Input, EventEmitter, Output } from '@angular/core';
//import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

import { Attend } from './models/attend';

import { Day } from './utils/day';

import { InspService } from './insp.service';

@Component({
    selector: 'attend-day',
    template: `
<div class="w3-card-2 w3-round w3-margin">
  <header class="w3-container w3-theme-d3">
    <h3><i class="fa fa-calendar-o fa-fw"></i>{{day.name}}</h3>
  </header>
  <div *ngIf="attends.length" class="schedule">
    <div class="w3-card-4 w3-round w3-margin" *ngFor="let attend of attends" (click)="select_attend(attend)">
      <header class="w3-container w3-theme">
	<h3>
	  <i *ngIf="attend.shift=='Matutino'" class="wi wi-sunrise wi-fw"></i>
	  <i *ngIf="attend.shift=='Vespertino'" class="wi wi-day-sunny wi-fw"></i>
	  <i *ngIf="attend.shift=='Noturno'" class="wi wi-night-clear wi-fw"></i>
	  {{attend.School.alias}}
	</h3>
      </header>
      <div class="activities w3-margin-top w3-padding">
	<span class="w3-badge w3-round w3-theme-l1">sem atividades</span>
	<span class="w3-badge w3-round w3-theme-l3" (click)="add_activity(attend)">+</span>
      </div>
      <div class="actions w3-margin-top">
	<!-- <button href="#" class="w3-btn w3-third w3-theme-l3" (click)="edit_activities(attend)" onclick="return false;"><i class="fa fa-pencil fa-fw"></i>Atividades</button> -->
	<button href="#" class="w3-btn w3-half w3-theme-l3" (click)="edit_attend(attend)" onclick="return false;"><i class="fa fa-pencil fa-fw"></i>Editar</button>
	<button href="#" class="w3-btn w3-half w3-theme-d3" (click)="del_attend(attend)" onclick="return false;"><i class="fa fa-trash fa-fw"></i>Excluir</button>
      </div>
      <br clear="both"/>
    </div>
  </div>
  <button *ngIf="attends.length<3" href="#" class="w3-btn-floating w3-theme-d3 w3-right" (click)="new_attend()" onclick="return false;"><i class="fa fa-plus"></i></button>
  <br clear="both"/>
</div>
`,
    providers: [InspService],
    //directives: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class AttendDayComponent {
    private _attends: Attend[];
    current = 0;

    @Input()
    day: Day;

    @Input()
    attends: Attend[]

    @Output()
    day_selected = new EventEmitter();

    @Output()
    attend_selected = new EventEmitter();

    @Output()
    delete_attend = new EventEmitter();

    constructor(private insp_service: InspService) {}

    new_attend(): void {
	this.day_selected.emit(this.day);
    }

    select_attend(attend: Attend) {
	this.current = attend.id;
    }

    edit_attend(attend: Attend) {
	this.attend_selected.emit(attend);
    }

    del_attend(attend: Attend) {
	console.log('Asking to remove Attend');
	this.delete_attend.emit(attend);
    }
}
