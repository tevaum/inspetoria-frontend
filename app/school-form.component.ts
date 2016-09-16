import { Component, Input, Output, EventEmitter} from '@angular/core';

import { School } from './models/school';

import { InspService } from './insp.service';

@Component({
    selector: 'school-form',
    template: `
<div *ngIf="school" id="school-form" class="w3-modal" style="display: block">
  <div class="w3-modal-content w3-card-8 w3-round w3-animate-zoom" style="max-width: 610px">
    <div class="w3-container">
      <span class="w3-closebtn" (click)="close()">&times;</span>
      <header>
	<h5>Escola</h5>
      </header>
      <form class="w3-container">
	<div class="w3-section">
	  <label>Nome</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nome da escola" required [(ngModel)]="school.name" name="name"/>

	  <label>Apelido</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Apelido da escola" required [(ngModel)]="school.alias" name="alias"/>

	  <label>Ano</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Ano de atendimento" required [(ngModel)]="school.year" name="year"/>

	  <a class="w3-btn-block w3-green w3-section w3-padding" (click)="add_school(school)">Salvar</a>
	</div>
      </form>
    </div>
  </div>
</div>
`
})

export class SchoolFormComponent {
    @Input()
    school: School;

    @Output()
    school_added = new EventEmitter();

    constructor(private insp_service: InspService) {}

    add_school() {
	this.insp_service.add_school(this.school).then((a) => {
	    this.school_added.emit({});
	    this.close();
	});
    }

    close() {
	this.school = null;
    }
}
