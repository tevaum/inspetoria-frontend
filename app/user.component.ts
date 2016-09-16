import { Component, OnInit } from '@angular/core';

import { User } from './models/user';

import { InspService } from './insp.service';

@Component({
    selector: 'user',
    template: `
<h6>Usuários</h6>
<div *ngFor="let user of users" class="w3-card-2 w3-round w3-round w3-margin" (click)="select(user)">
  <header class="w3-container w3-theme-d3 w3-center">
    <h3><abbr title="{{user.name}}">{{user.alias}}</abbr></h3>
  </header>
  <div class="w3-container">
    <p class="name"><i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>{{user.name}}</p>
    <p class="email"><i class="fa fa-envelope fa-fw w3-margin-right w3-text-theme"></i>{{user.email}}</p>
    <p class="role"><i class="fa fa-key fa-fw w3-margin-right w3-text-theme"></i>{{user.role}}</p>
    <p *ngIf="user.School" class="school"><i class="fa fa-graduation-cap fa-fw w3-margin-right w3-text-theme"></i>{{user.School.alias}}</p>
  </div>
</div>
<br clear="both"/>
<a href="/usuarios#" class="w3-btn w3-theme" (click)="new_user()" onclick="return false;">
  <i class="fa fa-user"></i>
  Adicionar Usuário
</a>
<user-form [user]="selected" (user_added)="update_users($event)"></user-form>
`,
    providers: [InspService]
})
export class UserComponent implements OnInit {
    selected: User;
    users: User[];

    constructor(private insp_service: InspService) {}

    ngOnInit(): void {
	this.update_users({});
    }

    update_users(evt) {
	if (evt.data)
	    this.users.push(evt.data);
	else
	    this.insp_service.users().then(users => this.users = users);

	console.log(this.users);
    }

    select(user: User): void {
	this.selected = user;
    }

    new_user(): void {
	this.selected = new User();
    }
}
