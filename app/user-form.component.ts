import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import { User } from './models/user';
import { School } from './models/school';

import { InspService } from './insp.service';

@Component({
    selector: 'user-form',
    template: `
<div *ngIf="user" id="user-form" class="w3-modal" style="display: block">
  <div class="w3-modal-content w3-card-8 w3-round w3-animate-zoom" style="max-width: 610px">
    <div class="w3-container">
      <span class="w3-closebtn" (click)="close()">&times;</span>
      <header>
	<h5>Usuário</h5>
      </header>
      <form class="w3-container">
	<div class="w3-section">
	  <label>Nome</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nome" required [(ngModel)]="user.name" name="name"/>

	  <label>Apelido</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Apelido" required [(ngModel)]="user.alias" name="alias"/>

	  <label>E-mail</label>
	  <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="E-mail" required [(ngModel)]="user.email" name="email"/>

	  <label>Acesso</label>
          <select class="w3-input w3-border w3-margin-bottom" required [(ngModel)]="user.role" name="role">
	    <option *ngFor="let role of roles" value="{{role}}">{{role}}<option>
	  </select>

	  <label>Escola</label>
          <select class="w3-input w3-border w3-margin-bottom" required [(ngModel)]="user.SchoolId" name="schoolid">
	    <option *ngFor="let school of schools" value="{{school.id}}">{{school.alias}}<option>
	  </select>

	  <a class="w3-btn-block w3-green w3-section w3-padding" (click)="add_user(user)">Salvar</a>
	</div>
      </form>
    </div>
  </div>
</div>
`
})

export class UserFormComponent implements OnInit {
    roles = ['Admin', 'Inspetor', 'Diretor(a)', 'Secretária'];
    schools: School[];

    @Input()
    user: User;

    @Output()
    user_added = new EventEmitter();

    constructor(private insp_service: InspService) {}

    ngOnInit(): void {
	this.insp_service.schools().then(schools => this.schools = schools);
    }

    add_user() {
	this.insp_service.add_user(this.user).then((a) => {
	    this.user_added.emit({});
	    this.close();
	});
    }

    close() {
	this.user = null;
    }
}
