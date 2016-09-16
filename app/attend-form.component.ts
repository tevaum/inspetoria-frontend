import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import { Attend } from './models/attend';
import { School } from './models/school';

import { InspService } from './insp.service';

@Component({
    selector: 'attend-form',
    template: `
<h1>HuvsNivs</h1>
<div id="attend-form" class="w3-modal" style="display: block">
  <div class="w3-modal-content w3-card-8 w3-round w3-animate-zoom" style="max-width: 610px">
    <div class="w3-container">
      <span class="w3-closebtn" (click)="close()">&times;</span>
      <header>
	<h5>Atendimento</h5>
      </header>
      <form class="w3-container">
	<div class="w3-section">
	  <label>Data</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nome" required [(ngModel)]="attend.date" name="date" readonly/>

	  <label>Turno</label>
          <select class="w3-input w3-border w3-margin-bottom" required [(ngModel)]="attend.shift" name="shift">
	    <option *ngFor="let shift of shifts" value="{{shift}}">{{shift}}<option>
	  </select>

	  <label>Escola</label>
          <select class="w3-input w3-border w3-margin-bottom" required [(ngModel)]="attend.SchoolId" name="schoolid">
	    <option *ngFor="let school of schools" value="{{school.id}}">{{school.alias}}<option>
	  </select>

	  <a class="w3-btn-block w3-green w3-section w3-padding" (click)="add_attend(attend)">Salvar</a>
	</div>
      </form>
    </div>
  </div>
</div>
`
})

export class AttendFormComponent implements OnInit {
    shifts = ['Matutino', 'Vespertino', 'Noturno'];
    schools: School[];

    @Input()
    attend: Attend;

    @Output()
    attend_added = new EventEmitter();

    @Output()
    onclose = new EventEmitter();

    constructor(private insp_service: InspService) {}

    ngOnInit(): void {
	this.insp_service.schools().then(schools => this.schools = schools);
    }

    add_attend() {
	this.insp_service.add_attend(this.attend).then((a) => {
	    this.attend_added.emit({});
	    this.close();
	});
    }

    close () {
	this.onclose.emit();
    }
}
