import { Component, OnInit } from '@angular/core';

import { School } from './models/school';

import { InspService } from './insp.service';

@Component({
    selector: 'school',
    template: `
<h6>Escolas</h6>
<div *ngFor="let school of schools" class="w3-card-2 w3-round w3-round w3-margin" (click)="select(school)">
  <header class="w3-container w3-theme-d3 w3-center">
    <h3><abbr title="{{school.name}}">{{school.alias}}</abbr></h3>
  </header>
  <div class="w3-container">
    <p class="name"><i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>{{school.name}}</p>
    
    <p *ngFor="let user of school.Users" class="user">
      <i class="fa fa-user fa-fw w3-margin-right w3-text-theme"></i>{{user.role}}: {{user.alias}} <{{user.email}}>
    </p>
  </div>
</div>
<br clear="both"/>
<a href="/escolas#" class="w3-btn w3-theme" (click)="new_school()" onclick="return false;">
  <i class="fa fa-school"></i>
  Adicionar Escola
</a>
<school-form [school]="selected" (school_added)="update_schools($event)"></school-form>
`,
    providers: [InspService]
})
export class SchoolComponent implements OnInit {
    selected: School;
    schools: School[];

    constructor(private insp_service: InspService) {}

    ngOnInit(): void {
	this.update_schools({});
    }

    update_schools(evt) {
	if (evt.data)
	    this.schools.push(evt.data);
	else
	    this.insp_service.schools().then(schools => this.schools = schools);
    }

    select(school: School): void {
	this.selected = school;
    }

    new_school(): void {
	this.selected = new School();
    }
}
